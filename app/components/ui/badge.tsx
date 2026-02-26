// Badge (étiquette) pour afficher des statuts ou valeurs mises en avant.
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

// Variantes de badge : succès, alerte, danger, etc.
const badgeVariants = cva(
  "inline-flex items-center rounded-full border-none shadow-sm px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-primary/10 text-primary data-[status=success]:bg-emerald-50 data-[status=success]:text-emerald-700",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "bg-white text-foreground shadow-md",
        success:
          "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
        warning:
          "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
        danger:
          "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Propriétés compatibles avec un conteneur générique de type <div>.
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

// Composant Badge, stylé selon la variante choisie.
export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}
