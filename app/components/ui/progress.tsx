// Barre de progression simple utilisée pour les scores et pourcentage d’avancement.
import * as React from "react";
import { cn } from "~/lib/utils";

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  // Valeur courante de la progression, entre 0 et 100.
  value?: number;
}

export function Progress({ className, value = 0, ...props }: ProgressProps) {
  return (
    <div
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-muted",
        className
      )}
      {...props}
    >
      <div
        className="h-full w-full flex-1 bg-primary transition-transform duration-300"
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </div>
  );
}
