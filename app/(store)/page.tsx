import BlackFridayBanner from "@/components/BlackFridayBanner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <BlackFridayBanner />

      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center space-y-4">
        <h1 className="text-3xl font-bold">Welcome to Shopr</h1>
        <p className="text-gray-600">Browse all our latest products in the Shop.</p>
        <Link href="/shop">
          <Button>
            Go to Shop
          </Button>
        </Link>
      </div>
    </div>
  );
}
  