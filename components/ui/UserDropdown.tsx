"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
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
import { TraderAvatarSVG } from "../ui//avatar.svg";
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
          className="flex items-center gap-3 px-2 text-gray-400 hover:text-yellow-500 hover:bg-gray-800/50 transition-colors rounded-lg"
        >
          <div className="relative">
            <TraderAvatarSVG
              size={32}
              className="border border-gray-700 shadow-sm transition-transform hover:scale-105"
            />
            <div className="absolute -bottom-0.5 -right-0.5">
              <div className="h-3 w-3 rounded-full bg-emerald-500 border-2 border-gray-900"></div>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-start leading-tight">
            <span className="text-sm font-medium text-gray-300">
              {user.name}
            </span>
            <span className="text-xs text-gray-500">Trader</span>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-72 bg-gray-900/95 backdrop-blur-sm border border-gray-800 text-gray-300 shadow-xl"
      >
        <DropdownMenuLabel className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <TraderAvatarSVG
                size={48}
                className="border-2 border-yellow-500/30 shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1">
                <div className="h-4 w-4 rounded-full bg-yellow-500 border-2 border-gray-900 flex items-center justify-center">
                  <svg
                    className="w-2 h-2 text-gray-900"
                    fill="currentColor"
                    viewBox="0 0 8 8"
                  >
                    <path
                      d="M2 4.5L3.5 6L6 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-base font-semibold text-white truncate">
                {user.name}
              </span>
              <span className="text-sm text-gray-400 truncate">
                {user.email}
              </span>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                  <span>Online</span>
                </div>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-gray-800/50" />

        <div className="py-1">
          <DropdownMenuItem
            className="flex items-center gap-3 px-4 py-3 text-sm cursor-pointer hover:bg-red-500/10 hover:text-red-400 focus:bg-red-500/10 focus:text-red-400 transition-colors group"
            onClick={handleSignOut}
          >
            <div className="p-1.5 rounded-md bg-red-500/10 border border-red-500/20 group-hover:bg-red-500/20 group-hover:border-red-500/30 transition-colors">
              <LogOut className="h-4 w-4 text-red-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium">Wyloguj się</span>
              <span className="text-xs text-gray-500 group-hover:text-red-400/70 transition-colors">
                Zakończ sesję
              </span>
            </div>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="sm:hidden bg-gray-800/50" />
        <nav className="sm:hidden px-1 py-2">
          <NavItems initialStocks={initialStocks} />
        </nav>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
