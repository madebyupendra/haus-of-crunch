import { imageUrl } from "@/lib/ImageUrl";
import { Product } from "@/sanity.types";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const isOutOfStock = product.stock != null && product.stock <= 0;

  const brandTitle = (product as any).brand?.title || "";

  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className={`group flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${
        isOutOfStock ? "opacity-50" : ""
      }`}
    >
      <div className="relative w-full aspect-square overflow-hidden">
        {product.image && (
          <Image
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            src={imageUrl(product.image).url()}
            alt={product.name || "Product image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4 w-full">
        {brandTitle && (
          <p className="text-xs text-gray-500 mb-1 truncate">{brandTitle}</p>
        )}
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h2>
        <p className="mt-2 text-lg font-bold text-gray-900">
          ${product.price?.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;


