import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function ShopPage() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <div className="flex flex-col items-center justify top min-h-screen p-4">
      <ProductsView products={products} categories={categories} />
    </div>
  );
}


