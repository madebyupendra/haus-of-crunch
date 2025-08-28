// components/ui/checkbox.tsx
import * as React from "react";

type CheckboxProps = {
	id?: string;
	checked?: boolean;
	defaultChecked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	disabled?: boolean;
	className?: string;
};

export function Checkbox({
	id,
	checked,
	defaultChecked,
	onCheckedChange,
	disabled,
	className,
}: CheckboxProps) {
	return (
		<input
			id={id}
			type="checkbox"
			checked={checked}
			defaultChecked={defaultChecked}
			onChange={(e) => onCheckedChange?.(e.target.checked)}
			disabled={disabled}
			className={
				[
					"h-4 w-4 rounded border border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500",
					"disabled:opacity-50 disabled:cursor-not-allowed",
					className,
				].filter(Boolean).join(" ")
			}
		/>
	);
}