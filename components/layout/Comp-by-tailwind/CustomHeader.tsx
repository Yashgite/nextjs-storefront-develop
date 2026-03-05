"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import logo_Shopping from "@/public/logo_Shopping.png";

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/" },
    { label: "Categories", href: "/" },
    { label: "Contact", href: "/" },
];

export const CustomHeader = () => {
    const [search, setSearch] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        if (search.trim()) console.log("Searching for:", search);
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-slate-950 text-white shadow-lg shadow-black/20">
            {/* Top accent */}
            <div className="h-0.5 w-full bg-gradient-to-r from-amber-500/80 via-rose-500/60 to-amber-500/80" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main bar */}
                <div className="flex items-center justify-between gap-4 py-3 sm:py-4">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="shrink-0 flex items-center gap-2 sm:gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60"
                    >
                        <span className="relative w-80 h-20">
                            <Image
                                src={logo_Shopping}
                                alt="My Storefront logo"
                                fill
                                priority
                                
                                className="object-contain"
                            />
                        </span>


                        {/* <span className="hidden sm:inline text-lg md:text-xl font-bold tracking-tight text-white hover:text-amber-400 transition-colors duration-200">
                            Shopify - Online Store
                        </span> */}

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
                                className="w-full pl-4 pr-10 py-2.5 rounded-lg bg-slate-800/80 border border-slate-700/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-200"
                            />
                            <button
                                type="submit"
                                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-md bg-amber-500/90 text-white hover:bg-amber-500 transition-colors duration-200"
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
                        {NAV_LINKS.map(({ label, href }) => (
                            <Link
                                key={label}
                                href={href}
                                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-800/50 transition-all duration-200"
                            >
                                {label}
                            </Link>
                        ))}
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
                        {NAV_LINKS.map(({ label, href }) => (
                            <li key={label}>
                                <Link
                                    href={href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block px-4 py-3 rounded-lg text-slate-300 hover:text-amber-400 hover:bg-slate-800/50 transition-colors duration-200 font-medium"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};
