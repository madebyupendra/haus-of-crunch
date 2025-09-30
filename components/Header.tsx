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
import useBasketStore from "@/store/store";

function Header() {
  const { user } = useUser();
  const itemCount = useBasketStore(
    (state) => state.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <header className="flex flex-wrap items-center justify-between px-4 py-2">
      <div className="flex w-full flex-wrap items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="mx-auto text-2xl font-bold text-blue-500 cursor-pointer hover:opacity-50 sm:mx-0"
        >
          Shopr
        </Link>

        {/* Search Bar */}
        <Form
          action="/search"
          className="mt-2 w-full sm:mt-0 sm:ml-auto sm:w-auto"
        >
          <input
            type="text"
            name="query"
            placeholder="Search for Products"
            className="w-full max-w-xs rounded border bg-gray-100 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          />
        </Form>

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
    </header>
  );
}

export default Header;
