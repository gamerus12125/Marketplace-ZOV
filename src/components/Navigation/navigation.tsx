import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { signIn, signOut } from "next-auth/react";
import { useAppSession } from "@/auth/session/use-app-session";
import { ProfileButton } from "../ui/profile-button";
export const Navigation = ({
  className,
  column,
}: {
  className?: string;
  column?: boolean;
}) => {
  const session = useAppSession();
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList className={column ? "flex flex-col" : ""}>
        <NavigationMenuItem>
          <Link legacyBehavior passHref href="/">
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} text-xl`}
            >
              <Image src="/logo.png" alt="logo" width={30} height={30} />
              ZOV
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link legacyBehavior passHref href="/catalog" className="text-xl">
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} text-xl`}
            >
              Каталог
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        {session.status == "unauthenticated" ? (
          <NavigationMenuItem>
            <Button variant="ghost" className="text-xl" onClick={() => signIn()}>Войти</Button>
          </NavigationMenuItem>
        ) : (
          <NavigationMenuItem>
            <ProfileButton />
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
