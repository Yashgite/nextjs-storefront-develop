import { useState } from "react";

export const CustomHeader = () => {
    const [search, setSearch] = useState("");

    const handleSearch = (e:any) => {
        e.preventDefault();
        console.log("Searching for:", search);
    };

    return (
        <header className="bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
               
                <h1 className="text-2xl font-bold">My Storefront</h1>

                <form onSubmit={handleSearch} className="flex">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="px-6 py-2 rounded-l-md text-black focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 px-4 py-2 rounded-r-md hover:bg-blue-600"
                    >
                        Search
                    </button>
                </form>

                <nav>
                    <ul className="flex gap-6 text-sm md:text-base">
                        <li className="hover:text-gray-300 cursor-pointer">Home</li>
                        <li className="hover:text-gray-300 cursor-pointer">Shop</li>
                        <li className="hover:text-gray-300 cursor-pointer">Categories</li>
                        <li className="hover:text-gray-300 cursor-pointer">Contact</li>
                    </ul>
                </nav>


            </div>
        </header>
    );
};