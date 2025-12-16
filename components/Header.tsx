import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";
import NavItems from "./ui/NavItems";
import UserDropdown from "./ui/UserDropdown";

/**
 * Header
 *
 * Top-level application header containing the logo, navigation and user
 * dropdown. This component is used on every page to provide consistent
 * branding and navigation.
 *
 * @returns {JSX.Element} The site header element.
 */
const Header = ({ user }: { user: User }): JSX.Element => {
  return (
    <header className="sticky top-0 header">
      <div className="container header-wrapper">
        <Link href="/">
          <Image
            src="/assets/icons/logo.svg"
            alt="Signal Logo"
            width={140}
            height={32}
            className="h-8 w-auto cursor-pointer"
          />
        </Link>
        <nav className="hidden sm:block">
          <NavItems initialStocks={[]} />
        </nav>
        <UserDropdown user={user} initialStocks={[]} />
      </div>
    </header>
  );
};
export default Header;
