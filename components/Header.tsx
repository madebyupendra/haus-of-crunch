"use client";

import {
  ClerkLoaded,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { imageUrl } from "@/lib/ImageUrl";
import useBasketStore from "@/store/store";

function Header() {
  const { user } = useUser();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const itemCount = useBasketStore(
    (state) => state.items.reduce((total, item) => total + item.quantity, 0)
  );

  useEffect(() => {
    if (!isSearchOpen) return;
    let active = true;
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      const q = searchQuery?.trim();
      if (!q) {
        if (active) setSearchResults([]);
        return;
      }
      try {
        setIsSearching(true);
        const results = await client.fetch(
          `*[_type == "product" && (
            name match $q ||
            _id match $q ||
            brand->title match $q
          )] | order(name asc)[0...8]{
            _id,
            name,
            slug,
            price,
            image,
            brand->{ title }
          }`,
          { q: `${q}*` },
          { signal: controller.signal }
        );
        if (active) setSearchResults(results || []);
      } catch (err) {
        if (active) setSearchResults([]);
      } finally {
        if (active) setIsSearching(false);
      }
    }, 300);

    return () => {
      active = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [searchQuery, isSearchOpen]);

  return (
    <header className="flex flex-wrap items-center justify-between px-4 py-2 relative">
      <div className="flex w-full flex-wrap items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="mx-auto text-2xl font-bold text-blue-500 cursor-pointer hover:opacity-50 sm:mx-0"
        >
          Shopr
        </Link>

        {/* Search Icon Trigger */}
        <button
          type="button"
          aria-label="Open search"
          onClick={() => setIsSearchOpen(true)}
          className="ml-auto inline-flex items-center justify-center rounded p-2 text-gray-700 hover:bg-gray-100 sm:ml-auto"
        >
          <SearchIcon className="w-5 h-5" />
        </button>

        {/* Basket + User Section */}
        <div className="mt-4 flex flex-1 items-center space-x-4 sm:mt-0 sm:flex-none">
          {/* Shop Link */}
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center justify-center rounded px-4 py-2 font-medium text-blue-600 hover:underline"
          >
            Shop
          </Link>
          {/* Basket */}
          <Link
            href="/basket"
            className="flex flex-1 items-center justify-center space-x-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 sm:flex-none sm:justify-start"
          >
            <TrolleyIcon className="w-6 h-6" />
         <span
          className=" -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
        >
          {itemCount}
        </span>

        <span>My Basket</span>
          </Link> 

          {/* User Area */}
          <ClerkLoaded>
            {user && (
              <Link
                href="/order"
                className="flex flex-1 items-center justify-center space-x-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 sm:flex-none sm:justify-start"
              >
                <PackageIcon className="h-6 w-6" />
                <span>My Orders</span>
              </Link>
            )}

            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton />
                <div className="hidden text-xs sm:block">
                  <p className="text-gray-400">Welcome Back</p>
                  <p className="font-bold">{user.fullName}!</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}
          </ClerkLoaded>
        </div>
      </div>
      {/* Sliding Search Panel below header */}
      <AnimatePresence initial={false}>
        {isSearchOpen && (
          <motion.div
            key="search-overlay"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute left-0 right-0 top-full z-50 bg-white flex flex-col shadow-lg overflow-hidden h-screen md:h-[70vh]"
          >
            <div className="p-4 flex-1 overflow-auto">
              <Form action="/search" className="w-full">
                <div className="flex w-full gap-2">
                  <input
                    autoFocus
                    type="text"
                    name="query"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products by title, ID, or brand"
                    className="w-full rounded border bg-gray-100 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </div>
              </Form>
              <div className="mt-4">
                {isSearching && (
                  <p className="text-sm text-gray-500">Searching…</p>
                )}
                {!isSearching && searchQuery.trim() && searchResults.length === 0 && (
                  <p className="text-sm text-gray-600">Oops, looks like there’s no such product available</p>
                )}
                {!isSearching && searchResults.length > 0 && (
                  <ul className="divide-y">
                    {searchResults.map((p) => (
                      <li key={p._id} className="py-3">
                        <Link href={`/product/${p.slug?.current}`} className="flex items-center gap-3 hover:opacity-90">
                          <div className="relative size-14 shrink-0 overflow-hidden rounded border">
                            {p.image && (
                              <Image
                                src={imageUrl(p.image).url()}
                                alt={p.name || "Product"}
                                fill
                                className="object-contain"
                              />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                            <p className="text-xs text-gray-500 truncate">{p.brand?.title}</p>
                          </div>
                          <div className="ml-auto text-sm font-semibold text-gray-900">${p.price?.toFixed?.(2)}</div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
