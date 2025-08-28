"use client";

import { Category, Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import { useMemo, useState } from "react";
import { Checkbox } from "./ui/checkbox";

interface ProductsViewProps {
	products: Product[];
	categories: Category[];
}

const ProductsView = ({ products, categories }: ProductsViewProps) => {
	const [selected, setSelected] = useState<Set<string>>(new Set());

	const toggle = (id: string) => {
		setSelected(prev => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	};

	const filtered = useMemo(() => {
		if (!selected.size) return products;
		return products.filter(p =>
			p.categories?.some((c: any) => c?._ref && selected.has(c._ref))
		);
	}, [products, selected]);

	return (
		<div className="flex flex-col sm:flex-row gap-6 w-full">
			<aside className="w-full sm:w-64 flex-shrink-0 border rounded-md bg-white p-4 h-fit">
				<h3 className="text-lg font-semibold mb-3">Filter by Category</h3>
				<div className="space-y-2">
					{categories?.map(cat => (
						<label key={cat._id} className="flex items-center gap-3 cursor-pointer">
							<Checkbox
								checked={selected.has(cat._id!)}
								onCheckedChange={() => toggle(cat._id!)}
								id={cat._id}
							/>
							<span className="text-sm">{cat.title}</span>
						</label>
					))}
				</div>
			</aside>

			<div className="flex-1">
				<ProductGrid products={filtered} />
				<hr className="w-1/2 sm:w-3/4" />
			</div>
		</div>
	);
};

export default ProductsView;