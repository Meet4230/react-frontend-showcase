"use client";

import { useState } from "react";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

export default function Header({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <header className="bg-white shadow-md mt-[70px]">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">MyShop</h1>
        {/* <form onSubmit={handleSearch} className="flex-1 mx-4"> */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => handleSearch(e)}
          />
          <button type="submit" className="absolute right-3 top-2">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
          </button>
        </div>
        {/* </form> */}
        <button className="p-2 rounded-full bg-blue-500 text-white">
          <ShoppingCartIcon className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}
