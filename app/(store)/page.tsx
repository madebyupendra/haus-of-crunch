import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {
  const products = await getAllProducts();
  
  return (
    <div>
      <h1>Hello World 123</h1>

      {/* Render all the products */}
      <Button>Click Me</Button>
    </div>
  );
}
 