"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { signOut } from "../../lib/actions/auth.actions";
import NavItems from "./NavItems";

type UserDropdownProps = {
  user: User;
  initialStocks: StockWithWatchlistStatus[];
};

const UserDropdown = ({ user, initialStocks }: UserDropdownProps) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/sign-in");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-3 px-2 text-gray-400 hover:text-yellow-500"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="https://wallpapers.com/images/hd/business-cat-meme.png-1c1hpvq955hqoeht.png"
              alt={user.name}
            />
            <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
              {user.name?.[0]}
            </AvatarFallback>
          </Avatar>

          <div className="hidden md:flex flex-col items-start leading-tight">
            <span className="text-sm font-medium">{user.name}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-64 bg-neutral-900 border border-neutral-800 text-gray-300"
      >
        <DropdownMenuLabel>
          <div className="flex items-center gap-3 py-1.5">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src="https://wallpapers.com/images/hd/business-cat-meme.png-1c1hpvq955hqoeht.png"
                alt={user.name}
              />
              <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
                {user.name?.[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <span className="text-sm font-medium">{user.name}</span>
              <span className="text-xs text-gray-500">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-neutral-800" />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer text-sm focus:bg-neutral-800 focus:text-yellow-500"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Wyloguj się
        </DropdownMenuItem>

        <DropdownMenuSeparator className="sm:hidden bg-neutral-800" />
        <nav className="sm:hidden px-1">
          <NavItems initialStocks={initialStocks} />
        </nav>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
