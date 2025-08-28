"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { imageUrl } from "@/lib/ImageUrl";
import { FEATURED_PRODUCTS_QUERYResult } from "@/sanity.types";

type Props = {
  featured: FEATURED_PRODUCTS_QUERYResult;
};

export default function ProductCarousel({ featured }: Props) {
  if (!featured?.products?.length) return null;

  return (
    <section className="px-6 py-12">
      {featured.title && (
        <h2 className="text-3xl font-bold mb-6">{featured.title}</h2>
      )}

      <Carousel className="w-full">
        <CarouselContent>
          {featured.products.map((product) => {
            // Make sure the product is fully populated
            if (!("name" in product)) return null;

            return (
              <CarouselItem
                key={product._id}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="p-4 border rounded-xl shadow-sm bg-white">
                  {product.image?.asset && (
                    <div className="relative w-full h-48 mb-4">
                      <Image
                        src={imageUrl(product.image).url()}
                        alt={product.name || "Product"}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  {product.price && (
                    <p className="text-gray-600 mt-1">${product.price}</p>
                  )}
                  {product.slug?.current && (
                    <Link
                      href={`/product/${product.slug.current}`}
                      className="mt-3 inline-block text-sm font-medium text-white bg-black px-4 py-2 rounded-lg hover:bg-gray-800"
                    >
                      View
                    </Link>
                  )}
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
