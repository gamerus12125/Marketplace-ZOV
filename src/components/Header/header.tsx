"use client"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export const Header = () => {
  return (
    <header>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link legacyBehavior passHref href="/">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Главная страница
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link legacyBehavior passHref href="/catalog">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Каталог
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
