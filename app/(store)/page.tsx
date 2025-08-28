import { getActiveHero } from "@/sanity/lib/hero/getActiveHero";
import { getActiveHomeSections } from "@/sanity/lib/home/getActiveHomeSections";
import { getFeaturedProducts } from "@/sanity/lib/products/getFeaturedProducts";
import Hero from "@/components/Hero";
import HomeSections from "@/components/HomeSections";
import ProductCarousel from "@/components/ProductCarousel";

export default async function HomePage() {
  const hero = await getActiveHero();
  const sections = await getActiveHomeSections();
  const featured = await getFeaturedProducts();

  return (
    <main className="overflow-x-hidden">
      <Hero hero={hero} />
      <HomeSections sections={sections} />
      {featured && <ProductCarousel featured={featured} />}
    </main>
  );
}
