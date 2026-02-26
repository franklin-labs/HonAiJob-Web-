// Composants de carte (Card) pour structurer les blocs de contenu de l’interface.
import * as React from "react";
import { cn } from "~/lib/utils";

// Conteneur principal de la carte avec fond, bordure et ombre.
export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  );
}

// En-tête de carte, généralement pour le titre et la description.
export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
}

// Titre principal de la carte.
export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

// Description secondaire de la carte.
export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

// Zone de contenu principale (texte, graphiques, etc.).
export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

// Pied de carte, par exemple pour les actions ou boutons.
export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  );
}
