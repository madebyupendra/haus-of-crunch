"use client";

import Image from "next/image";
import Link from "next/link";
import { ACTIVE_HERO_QUERYResult } from "@/sanity.types";
import { imageUrl } from "@/lib/ImageUrl";
import { Button } from "@/components/ui/button";

type HeroProps = {
  hero: ACTIVE_HERO_QUERYResult;
};

export default function Hero({ hero }: HeroProps) {
  if (!hero) return null;

  return (
    <div className="px-5 sm:px-10"> {/* 20px on mobile, 40px on tablet+ */}
      <section
        className="
          relative w-full 
          h-[70vh] sm:h-screen   /* 70% viewport height on mobile, 100% on tablet+ */
          flex items-center justify-center 
          overflow-hidden
        "
      >
        {hero.backgroundImage?.asset && (
          <Image
            src={imageUrl(hero.backgroundImage).url()}
            alt={hero.title || "Hero background"}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 text-center text-white max-w-2xl px-6 sm:text-left">
          {hero.title && (
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
              {hero.title}
            </h1>
          )}
          {hero.subtitle && (
            <p className="text-base sm:text-lg md:text-xl mb-6">
              {hero.subtitle}
            </p>
          )}
          {hero.buttonText && hero.buttonLink && (
            <div className="mt-6">
              <Button asChild variant="default" size="lg">
                <Link href={hero.buttonLink}>{hero.buttonText}</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
