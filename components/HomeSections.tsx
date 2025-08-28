"use client";

import Image from "next/image";
import Link from "next/link";
import { imageUrl } from "@/lib/ImageUrl";
import { Button } from "@/components/ui/button"; // <-- import ShadCN Button

type HomeSection = {
  _id: string;
  title: string;
  image?: any;
  buttonText?: string;
  buttonLink?: string;
};

export default function HomeSections({ sections }: { sections: HomeSection[] }) {
  if (!sections?.length) return null;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-5 px-12 py-12">
      {sections.map((section) => (
        <div
          key={section._id}
          className="
            relative 
            aspect-square        /* Keep 1:1 on all screen sizes */
            overflow-hidden 
            shadow-lg
          "
        >
          {section.image?.asset && (
            <Image
              src={imageUrl(section.image).url()}
              alt={section.title}
              fill
              className="object-cover"
            />
          )}

          <div className="absolute inset-0 bg-black/40" />

          {/* Bottom-left content */}
          <div className="absolute bottom-6 left-6 text-left text-white z-10">
            <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
            {section.buttonText && section.buttonLink && (
              <div className="mt-2">
                <Button asChild variant="default" size="lg">
                  <Link href={section.buttonLink}>{section.buttonText}</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
