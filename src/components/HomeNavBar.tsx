"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { ModeToggle } from "./ThemeToggler";
import { BrainCircuit } from "lucide-react";
import { RainbowButton } from "./magicui/rainbow-button";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
export function HomeNavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <div
            onClick={() => redirect("/")}
            className="flex gap-2 items-center cursor-pointer"
          >
            <BrainCircuit size={35} />
            <h3 className="text-xl font-josefin-sans text-center">Quizium</h3>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger>
                {" "}
                <div
                  className={
                    "z-10 flex -space-x-4 rtl:space-x-reverse cursor-pointer"
                  }
                >
                  <Image
                    className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800"
                    src={session?.user?.image ?? "/default-avatar.png"}
                    width={40}
                    height={40}
                    alt="avatar"
                    priority
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="min-w-[180px] rounded-lg bg-white dark:bg-gray-900 shadow-lg p-2 mt-2"
                sideOffset={8}
                align="end"
              >
                <DropdownMenuLabel className="px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-1 h-px bg-gray-200 dark:bg-gray-700" />
                <DropdownMenuItem className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-800 dark:text-gray-100 transition-colors">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-2 rounded-md hover:bg-red-100 dark:hover:bg-red-900 cursor-pointer text-red-600 dark:text-red-400 transition-colors">
                  <button onClick={() => signOut({ redirectTo: "/" })}>
                    Sign Out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <NavbarButton className="p-0 cursor-pointer">
              <ModeToggle  />
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <div
              onClick={() => redirect("/")}
              className="flex gap-2 items-center cursor-pointer"
            >
              <BrainCircuit size={35} />
              <h3 className="text-xl font-josefin-sans">Quizium</h3>
            </div>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            className="flex flex-row-reverse justify-between z-1"
          >
            <DropdownMenu>
              <DropdownMenuTrigger>
                {" "}
                <div
                  className={
                    "z-10 flex -space-x-4 rtl:space-x-reverse cursor-pointer"
                  }
                >
                  <Image
                    className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800"
                    src={session?.user?.image ?? "/default-avatar.png"}
                    width={40}
                    height={40}
                    alt="avatar"
                    priority
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="min-w-[180px] rounded-lg bg-white dark:bg-gray-900 shadow-lg p-2 mt-2"
                sideOffset={8}
                align="end"
              >
                <DropdownMenuLabel className="px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-1 h-px bg-gray-200 dark:bg-gray-700" />
                <DropdownMenuItem className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-800 dark:text-gray-100 transition-colors">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-2 rounded-md hover:bg-red-100 dark:hover:bg-red-900 cursor-pointer text-red-600 dark:text-red-400 transition-colors">
                  <button onClick={() => signOut({ redirectTo: "/" })}>
                    Sign Out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <NavbarButton className="p-0 cursor-pointer">
              <ModeToggle />
            </NavbarButton>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Navbar */}
    </div>
  );
}
