"use client";

import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { MenuIcon } from "../ui/icons/menu";
import { Navigation } from "../Navigation/navigation";
import { useAppSession } from "@/auth/session/use-app-session";
import { ProfileButton } from "../ui/profile-button";
import { signIn } from "next-auth/react";

export const Header = () => {
  const session = useAppSession();
  return (
    <header className="border-b-2 border-b-slate-600 flex justify-evenly py-2">
      <Navigation className="hidden sm:flex" />
      {session.status == "unauthenticated" ? (
        <Button variant="ghost" className="text-xl" onClick={() => signIn()}>
          Войти
        </Button>
      ) : (
        <ProfileButton />
      )}
      <Sheet>
        <SheetTrigger asChild className="sm:hidden">
          <Button variant={"ghost"}>
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col gap-2">
          <Navigation column={true} className="flex-none mt-10" />
        </SheetContent>
      </Sheet>
    </header>
  );
};
