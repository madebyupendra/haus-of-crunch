// app/(store)/shop/page.tsx
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function ShopPage() {
	const products = await getAllProducts();
	const categories = await getAllCategories();

	return (
		<div className="flex flex-col items-center justify-top min-h-screen p-4">
			<h1 className="text-3xl font-bold mb-6">Shop All Products</h1>
			<ProductsView products={products} categories={categories} />
		</div>
	);
}