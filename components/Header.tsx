"use client";

import {
  ClerkLoaded,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Form from "next/form";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import { SearchIcon, User as UserIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl = `${pathname || "/"}${searchParams?.toString() ? `?${searchParams.toString()}` : ""}`;
  const searchTriggerRef = useRef<HTMLButtonElement | null>(null);
  const searchPanelRef = useRef<HTMLDivElement | null>(null);
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

  // Close and reset search on route changes (pathname or query changes)
  useEffect(() => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    setIsSearching(false);
  }, [pathname, searchParams]);

  // Close search when clicking outside the panel/trigger
  useEffect(() => {
    if (!isSearchOpen) return;

    function handlePointerDown(e: MouseEvent) {
      const target = e.target as Node | null;
      const inPanel = !!searchPanelRef.current && searchPanelRef.current.contains(target as Node);
      const inTrigger = !!searchTriggerRef.current && searchTriggerRef.current.contains(target as Node);
      if (!inPanel && !inTrigger) {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isSearchOpen]);

  // Use GSAP for expanding open animation with slight acceleration
  useEffect(() => {
    if (!isSearchOpen) return;
    const panel = searchPanelRef.current;
    if (!panel) return;
    gsap.set(panel, { scaleY: 0, transformOrigin: "top" });
    gsap.to(panel, { scaleY: 1, duration: 0.10, ease: "power2.in" });
  }, [isSearchOpen]);

  return (
    <header className="flex flex-wrap items-center justify-between px-4 py-2 relative">
      <div className="grid w-full grid-cols-3 items-center">
        {/* Left: Shop link */}
        <div className="justify-self-start">
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center justify-center rounded px-4 py-2 font-medium text-blue-600 hover:underline"
          >
            Shop
          </Link>
        </div>

        {/* Center: Logo */}
        <div className="justify-self-center">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-500 cursor-pointer hover:opacity-50"
          >
            Shopr
          </Link>
        </div>

        {/* Right: Search + Basket + User */}
        <div className="flex items-center justify-end space-x-4 justify-self-end">
        <button
            type="button"
            aria-label="Open search"
          onClick={() => setIsSearchOpen(true)}
          ref={searchTriggerRef}
            className="inline-flex items-center justify-center rounded p-2 text-gray-700 hover:bg-gray-100"
          >
            <SearchIcon className="w-5 h-5" />
          </button>

          <div className="relative">
            <Link
              href="/basket"
              aria-label="Open basket"
              className="inline-flex items-center justify-center rounded p-2 text-gray-700 hover:bg-gray-100"
            >
              <TrolleyIcon className="w-5 h-5" />
            </Link>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {itemCount}
              </span>
            )}
          </div>

          <ClerkLoaded>
            {user && (
              <Link
                href="/order"
                className="hidden sm:inline-flex items-center justify-center space-x-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
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
              <Link
                href={`/sign-in?returnTo=${encodeURIComponent(currentUrl)}`}
                aria-label="Sign in"
                className="inline-flex items-center justify-center rounded p-2 text-gray-700 hover:bg-gray-100"
              >
                <UserIcon className="w-5 h-5" />
              </Link>
            )}
          </ClerkLoaded>
        </div>
      </div>
      {/* Sliding Search Panel below header */}
      <AnimatePresence initial={false}>
        {isSearchOpen && (
          <motion.div
            key="search-overlay"
            initial={{}}
            animate={{}}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute left-0 right-0 top-full z-50 bg-white flex flex-col overflow-hidden h-screen md:h-[70vh] origin-top"
            ref={searchPanelRef}
          >
            <div className="p-4 flex-1 overflow-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, delay: 0.25 }}
              >
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
              </motion.div>
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
