"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import type { Maybe, PrCategory } from "@/lib/gql/types";
import { useGetCart, useGetCategoryTree, useGetWishlist } from "@/hooks";
import { cartGetters } from "@/lib/getters";

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Cart", href: "/cart" },
    { label: "Wishlist", href: "/wishlist" },
];

export const CustomHeader = () => {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
    const categoriesMenuRef = useRef<HTMLDivElement | null>(null);

    const { data: categoryTree, isLoading: isCategoryLoading } = useGetCategoryTree([]);
    const { data: cart } = useGetCart();
    const { data: wishlist } = useGetWishlist();

    const cartItemCount = cartGetters.getCartItemCount(cart);
    const wishlistItemCount = Array.isArray((wishlist as any)?.items)
        ? (wishlist as any).items.length
        : ((wishlist as any)?.items?.length ?? 0);

    const displayedCategories = useMemo(
        () => (categoryTree || []).filter((c) => Boolean(c?.isDisplayed)),
        [categoryTree]
    );

    const getIndentClass = (depth: number) => {
        if (depth <= 0) return "";
        if (depth === 1) return "pl-3";
        if (depth === 2) return "pl-6";
        return "pl-8";
    };

    const renderCategoryLinks = (
        categories: Maybe<PrCategory>[],
        depth: number,
        onSelect: () => void,
        variant: "desktop" | "mobile"
    ) => {
        const cats = (categories || []).filter(Boolean);
        return cats.map((category) => {
            const name = category?.content?.name || category?.categoryCode || "Category";
            const href = category?.categoryCode ? `/category/${category.categoryCode}` : "#";
            const key = category?.categoryId || category?.categoryCode || name;
            const children = (category?.childrenCategories || []).filter((c) => Boolean(c?.isDisplayed));

            return (
                <div key={String(key)} className={depth > 0 ? `border-l border-slate-800/80 ml-2 ${getIndentClass(depth)}` : ""}>
                    <Link
                        href={href}
                        onClick={onSelect}
                        className={
                            variant === "desktop"
                                ? "block rounded-md px-3 py-2 text-sm text-slate-200 hover:bg-slate-800/60 hover:text-amber-400 transition-colors"
                                : "block rounded-md px-3 py-2.5 text-sm text-slate-200 hover:bg-slate-800/60 hover:text-amber-400 transition-colors"
                        }
                    >
                        {name}
                    </Link>

                    {children?.length ? (
                        <div className={variant === "desktop" ? "pb-1" : "pb-2"}>
                            {renderCategoryLinks(children as Maybe<PrCategory>[], depth + 1, onSelect, variant)}
                        </div>
                    ) : null}
                </div>
            );
        });
    };

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        const q = search.trim();
        if (!q) return;

        setMobileSearchOpen(false);
        setMobileMenuOpen(false);
        setCategoriesOpen(false);
        setMobileCategoriesOpen(false);

        router.push({
            pathname: "/search",
            query: { search: q },
        });
    };

    useEffect(() => {
        if (router.pathname === "/") {
            setSearch("");
        }
    }, [router.pathname]);

    useEffect(() => {
        if (!categoriesOpen) return;
        const onPointerDown = (e: MouseEvent | TouchEvent) => {
            if (!categoriesMenuRef.current) return;
            if (categoriesMenuRef.current.contains(e.target as Node)) return;
            setCategoriesOpen(false);
        };
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setCategoriesOpen(false);
        };
        document.addEventListener("mousedown", onPointerDown);
        document.addEventListener("touchstart", onPointerDown);
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("mousedown", onPointerDown);
            document.removeEventListener("touchstart", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [categoriesOpen]);

    return (
        <header className="sticky top-0 z-50 w-full bg-slate-950 text-white shadow-lg shadow-black/20">
            {/* Top accent */}
            <div className="h-0.5 w-full bg-gradient-to-r from-amber-500/80 via-rose-500/60 to-amber-500/80" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main bar */}
                <div className="flex items-center justify-between gap-4 py-3 sm:py-4">
                    {/* website name*/}
                    <Link
                        href="/"
                        className="shrink-0 flex items-center gap-2 sm:gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60"
                    >
                        <span className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight text-white hover:text-amber-400 transition-colors duration-200 whitespace-nowrap">
                            <span className="  text-amber-600">S</span>hopinity
                        </span>
                    </Link>

                    {/* Desktop search - centered, hidden on mobile */}
                    <form
                        onSubmit={handleSearch}
                        className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8"
                    >
                        <div className="relative w-full group">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-4 pr-10 py-2.5 rounded-3xl bg-slate-800/80 border border-slate-700/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-200"
                            />
                            <button
                                type="submit"
                                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-2xl bg-amber-500/90 text-white hover:bg-amber-500 transition-colors duration-200"
                                aria-label="Search"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </form>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map(({ label, href }) => {
                            const isCart = href === "/cart";
                            const isWishlist = href === "/wishlist";
                            const showCartBadge = isCart && cartItemCount > 0;
                            const showWishlistBadge = isWishlist && wishlistItemCount > 0;

                            return (
                                <Link
                                    key={label}
                                    href={href}
                                    className="relative px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-800/50 transition-all duration-200 flex items-center gap-1"
                                >
                                    <span>{label}</span>
                                    {showCartBadge && (
                                        <span className="inline-flex items-center justify-center min-w-[1.25rem] h-5 rounded-full bg-amber-500 text-[0.7rem] font-semibold text-slate-950 px-1.5">
                                            {cartItemCount}
                                        </span>
                                    )}
                                    {showWishlistBadge && (
                                        <span className="inline-flex items-center justify-center min-w-[1.25rem] h-5 rounded-full bg-amber-500 text-[0.7rem] font-semibold text-slate-950 px-1.5">
                                            {wishlistItemCount}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}

                        {/* Categories dropdown */}
                        <div className="relative" ref={categoriesMenuRef}>
                            <button
                                type="button"
                                onClick={() => setCategoriesOpen((o) => !o)}
                                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-800/50 transition-all duration-200 inline-flex items-center gap-1"
                                aria-haspopup="menu"
                                aria-expanded={categoriesOpen}
                            >
                                Categories
                                <svg
                                    className={`w-4 h-4 transition-transform ${categoriesOpen ? "rotate-180" : ""}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {categoriesOpen ? (
                                <div
                                    role="menu"
                                    className="absolute right-0 mt-2 w-80 lg:w-96 rounded-xl border border-slate-800/80 bg-slate-900/95 backdrop-blur-sm shadow-xl shadow-black/30 overflow-hidden"
                                >
                                    <div className="max-h-[70vh] overflow-auto p-2">
                                        {isCategoryLoading ? (
                                            <div className="px-3 py-2 text-sm text-slate-400">Loading categories…</div>
                                        ) : displayedCategories.length ? (
                                            renderCategoryLinks(
                                                displayedCategories as Maybe<PrCategory>[],
                                                0,
                                                () => setCategoriesOpen(false),
                                                "desktop"
                                            )
                                        ) : (
                                            <div className="px-3 py-2 text-sm text-slate-400">No categories found.</div>
                                        )}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </nav>

                    {/* Mobile: search toggle + hamburger */}
                    <div className="flex md:hidden items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setMobileSearchOpen((o) => !o)}
                            className="p-2 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800/50 transition-colors duration-200"
                            aria-label={mobileSearchOpen ? "Close search" : "Open search"}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen((o) => !o)}
                            className="p-2 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800/50 transition-colors duration-200"
                            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={mobileMenuOpen}
                        >
                            {mobileMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile search bar (expandable) */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${mobileSearchOpen ? "max-h-20 opacity-100 pb-3" : "max-h-0 opacity-0"
                        }`}
                >
                    <form onSubmit={handleSearch} className="pt-1">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-4 pr-12 py-2.5 rounded-lg bg-slate-800/80 border border-slate-700/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
                            />
                            <button
                                type="submit"
                                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-md bg-amber-500/90 text-white text-sm font-medium hover:bg-amber-500 transition-colors"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Mobile nav menu (full-width dropdown) */}
            <div
                className={`md:hidden border-t border-slate-800/80 bg-slate-900/95 backdrop-blur-sm transition-all duration-300 ease-out ${mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                    }`}
            >
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                    <ul className="flex flex-col gap-1">
                        {NAV_LINKS.map(({ label, href }) => {
                            const isCart = href === "/cart";
                            const isWishlist = href === "/wishlist";
                            const showCartBadge = isCart && cartItemCount > 0;
                            const showWishlistBadge = isWishlist && wishlistItemCount > 0;

                            return (
                                <li key={label}>
                                    <Link
                                        href={href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center justify-between px-4 py-3 rounded-lg text-slate-300 hover:text-amber-400 hover:bg-slate-800/50 transition-colors duration-200 font-medium"
                                    >
                                        <span>{label}</span>
                                        {showCartBadge && (
                                            <span className="inline-flex items-center justify-center min-w-[1.35rem] h-5 rounded-full bg-amber-500 text-[0.7rem] font-semibold text-slate-950 px-1.5">
                                                {cartItemCount}
                                            </span>
                                        )}
                                        {showWishlistBadge && (
                                            <span className="inline-flex items-center justify-center min-w-[1.35rem] h-5 rounded-full bg-amber-500 text-[0.7rem] font-semibold text-slate-950 px-1.5">
                                                {wishlistItemCount}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}

                        <li>
                            <button
                                type="button"
                                onClick={() => setMobileCategoriesOpen((o) => !o)}
                                className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-slate-300 hover:text-amber-400 hover:bg-slate-800/50 transition-colors duration-200 font-medium"
                                aria-expanded={mobileCategoriesOpen}
                            >
                                <span>Categories</span>
                                <svg
                                    className={`w-5 h-5 transition-transform ${mobileCategoriesOpen ? "rotate-180" : ""}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <div className={`pl-2 pr-1 ${mobileCategoriesOpen ? "max-h-[60vh] opacity-100" : "max-h-0 opacity-0 overflow-hidden"} transition-all duration-300 ease-out`}>
                                <div className="mt-1 mb-2 rounded-lg border border-slate-800/80 bg-slate-950/30 overflow-auto max-h-[60vh]">
                                    {isCategoryLoading ? (
                                        <div className="px-4 py-3 text-sm text-slate-400">Loading categories…</div>
                                    ) : displayedCategories.length ? (
                                        <div className="p-1">
                                            {renderCategoryLinks(
                                                displayedCategories as Maybe<PrCategory>[],
                                                0,
                                                () => {
                                                    setMobileMenuOpen(false);
                                                    setMobileCategoriesOpen(false);
                                                },
                                                "mobile"
                                            )}
                                        </div>
                                    ) : (
                                        <div className="px-4 py-3 text-sm text-slate-400">No categories found.</div>
                                    )}
                                </div>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};
