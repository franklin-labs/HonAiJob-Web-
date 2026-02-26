// Composants de tableau (Table) pour afficher des listes structurées.
import * as React from "react";
import { cn } from "~/lib/utils";

// Table globale, avec typographie de base.
export function Table({
  className,
  ...props
}: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <table
      className={cn(
        "w-full caption-bottom text-sm",
        className
      )}
      {...props}
    />
  );
}

// En-tête de tableau (ligne des colonnes).
export function TableHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn("[&_tr]:border-b bg-slate-50/80", className)}
      {...props}
    />
  );
}

// Corps du tableau (lignes de données).
export function TableBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

// Ligne de tableau, avec survol léger.
export function TableRow({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        "transition-colors hover:bg-slate-50/60 data-[state=selected]:bg-slate-50",
        className
      )}
      {...props}
    />
  );
}

// Cellule d’en-tête (nom de colonne).
export function TableHead({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "h-10 px-4 text-left align-middle text-xs font-medium text-slate-500",
        className
      )}
      {...props}
    />
  );
}

// Cellule de données.
export function TableCell({
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn("p-4 align-middle text-sm text-slate-700", className)}
      {...props}
    />
  );
}
