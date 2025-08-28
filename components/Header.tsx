"use client";

import {
	ClerkLoaded,
	SignInButton,
	UserButton,
	useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { PackageIcon } from "@sanity/icons";
import useBasketStore from "@/store/store";

function Header() {
	const { user } = useUser();
	const itemCount = useBasketStore(
		(state) => state.items.reduce((total, item) => total + item.quantity, 0)
	);

	return (
		<header className="flex flex-wrap items-center justify-between px-5 sm:px-10 py-2">
			<div className="flex w-full flex-wrap items-center justify-between">
				{/* Logo */}
				<Link
					href="/"
					className="mx-auto text-2xl font-bold text-blue-500 cursor-pointer hover:opacity-50 sm:mx-0"
				>
					Shopr
				</Link>

				{/* Primary Nav */}
				<nav className="hidden sm:flex items-center mx-4">
					<div className="relative group">
						<Link
							href="/shop"
							className="px-4 py-2 font-semibold text-gray-800 hover:text-blue-600"
						>
							Shop
						</Link>
						<div className="absolute left-0 mt-2 hidden group-hover:block">
							<div className="bg-white border rounded-lg shadow-lg p-6 w-[600px]">
								<div className="grid grid-cols-3 gap-6">
									<Link
										href={{ pathname: "/search", query: { query: "Proteins" } }}
										className="block p-3 rounded hover:bg-gray-100"
									>
										<p className="font-semibold">Proteins</p>
										<p className="text-sm text-gray-500">Whey, isolate, vegan</p>
									</Link>
									<Link
										href={{ pathname: "/search", query: { query: "Creatines" } }}
										className="block p-3 rounded hover:bg-gray-100"
									>
										<p className="font-semibold">Creatines</p>
										<p className="text-sm text-gray-500">Monohydrate, blends</p>
									</Link>
									<Link
										href={{ pathname: "/search", query: { query: "Preworkouts" } }}
										className="block p-3 rounded hover:bg-gray-100"
									>
										<p className="font-semibold">Preworkouts</p>
										<p className="text-sm text-gray-500">Energy, pump, focus</p>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</nav>

				{/* Search Bar */}
				<Form
					action="/search"
					className="mt-2 w-full sm:mt-0 sm:mx-4 sm:w-auto sm:flex-1"
				>
					<input
						type="text"
						name="query"
						placeholder="Search for Products"
						className="w-full max-w-4xl rounded border bg-gray-100 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
					/>
				</Form>

				{/* Basket + User Section */}
				<div className="mt-4 flex flex-1 items-center space-x-4 sm:mt-0 sm:flex-none">
					{/* Basket */}
					<Link
						href="/basket"
						className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white hover:bg-blue-700"
						aria-label="Basket"
					>
						<i className="ri-shopping-bag-2-line text-xl"></i>
						<span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full min-w-5 h-5 px-1 text-xs flex items-center justify-center">
							{itemCount}
						</span>
					</Link>

					{/* User Area */}
					<ClerkLoaded>
						{user && (
							<Link
								href="/order"
								className="flex flex-1 items-center justify-center space-x-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 sm:flex-none sm:justify-start"
							>
								<PackageIcon className="h-6 w-6" />
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
