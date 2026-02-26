// Menu déroulant contextuel basé sur Radix DropdownMenu.
import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "~/lib/utils";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

// Contenu principal du menu déroulant, rendu dans un portail.
export function DropdownMenuContent(
  props: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        {...props}
        className={cn(
          "z-50 min-w-[10rem] overflow-hidden rounded-lg border-none bg-white p-1 text-popover-foreground shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          props.className
        )}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

// Élément de menu cliquable standard.
export function DropdownMenuItem(
  props: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
) {
  return (
    <DropdownMenuPrimitive.Item
      {...props}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        props.className
      )}
    />
  );
}

// Label de section dans le menu (optionnellement décalé).
export function DropdownMenuLabel({
  inset,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Label
      {...props}
      className={cn(
        "px-2 py-1.5 text-sm font-semibold",
        inset && "pl-8",
        props.className
      )}
    />
  );
}

// Séparateur visuel entre groupes d’éléments.
export function DropdownMenuSeparator(
  props: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
) {
  return (
    <DropdownMenuPrimitive.Separator
      {...props}
      className={cn("-mx-1 my-1 h-px bg-muted", props.className)}
    />
  );
}

// Déclencheur d’un sous-menu (flèche à droite).
export function DropdownMenuSubTrigger({
  inset,
  children,
  ...props
}: React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubTrigger
> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      {...props}
      className={cn(
        "flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        inset && "pl-8",
        props.className
      )}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

// Contenu d’un sous-menu déroulant.
export function DropdownMenuSubContent(
  props: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
) {
  return (
    <DropdownMenuPrimitive.SubContent
      {...props}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-lg border bg-white p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        props.className
      )}
    />
  );
}

// Élément de menu avec case à cocher.
export function DropdownMenuCheckboxItem({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.CheckboxItem
>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      {...props}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        className
      )}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="h-3 w-3" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

// Élément de menu de type radio (une seule option active).
export function DropdownMenuRadioItem(
  props: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
) {
  return (
    <DropdownMenuPrimitive.RadioItem
      {...props}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        props.className
      )}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className="h-1.5 w-1.5 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {props.children}
    </DropdownMenuPrimitive.RadioItem>
  );
}
