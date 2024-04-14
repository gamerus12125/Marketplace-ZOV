"use client";

import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { MenuIcon } from "../ui/icons/menu";
import { Navigation } from "../Navigation/navigation";

export const Header = () => {
  return (
    <header>
      <Navigation className="hidden sm:flex" />
      <Sheet>
        <SheetTrigger asChild className="sm:hidden">
          <Button variant={"ghost"}>
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col gap-2">
          <Navigation column={true} className="flex-none mt-10"/>
        </SheetContent>
      </Sheet>
    </header>
  );
};
