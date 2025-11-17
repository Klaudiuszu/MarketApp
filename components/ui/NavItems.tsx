"use client";
import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";

/**
 * NavItems component rendering a list of navigation links from `NAV_ITEMS`.
 *
 * This component determines the active route and applies an active style to the corresponding link.
 *
 * @returns {JSX.Element} A list of navigation links with active-route highlighting.
 */
const NavItems = (): JSX.Element => {
  const pathName: string = usePathname();
  const isActive: (path: string) => boolean = (path: string) => {
    if (path === "/") {
      return pathName === "/";
    }
    return pathName.startsWith(path);
  };

  return (
    <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
      {NAV_ITEMS.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`hover:text-yellow-500 transition-colors ${
            isActive(href) ? "text-gray-100" : ""
          }`}
        >
          {label}
        </Link>
      ))}
    </ul>
  );
};
export default NavItems;
