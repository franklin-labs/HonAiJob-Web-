// Champ de saisie de base aligné avec le design system shadcn/ui.
import * as React from "react";
import { cn } from "~/lib/utils";

// Propriétés compatibles avec l’élément HTML <input>.
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

// Composant Input réutilisable pour les formulaires.
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border-none bg-white px-3 py-2 text-sm shadow-md transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ring-offset-background",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
