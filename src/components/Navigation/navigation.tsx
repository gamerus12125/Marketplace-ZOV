import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";
export const Navigation = ({
  className,
  column,
}: {
  className?: string;
  column?: boolean;
}) => {
  return (
    <NavigationMenu className={`${className}`}>
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
      </NavigationMenuList>
    </NavigationMenu>
  );
};
