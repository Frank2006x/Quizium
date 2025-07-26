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
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export function NavbarDemo() {
  const navItems = [
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Try It Out",
      link: "/home",
    },
    {
      name: "How It Works",
      link: "#how",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="relative w-full z-99">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <div className="flex gap-2 items-center">
            <BrainCircuit size={35} />
            <h3 className="text-xl font-josefin-sans text-center">Quizium</h3>
          </div>
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary">
              {!session ? (
                <RainbowButton
                  className="p-4"
                  onClick={() => {
                    signIn("google", {
                      callbackUrl: "/home",
                      prompt: "select_account",
                    });
                  }}
                >
                  Login
                </RainbowButton>
              ) : (
                <RainbowButton
                  className="p-2"
                  onClick={() => redirect("/home")}
                >
                  Get started
                </RainbowButton>
              )}
            </NavbarButton>
            <NavbarButton className="p-0">
              <ModeToggle />
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <div className="flex gap-2 items-center">
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
          >
            <NavbarButton className="p-0">
              <ModeToggle />
            </NavbarButton>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton variant="secondary">
                {!session ? (
                  <RainbowButton
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      signIn("google", {
                        callbackUrl: "/home",
                        prompt: "select_account",
                      });
                    }}
                    className="w-full"
                  >
                    Login
                  </RainbowButton>
                ) : (
                  <RainbowButton
                    className="p-2 w-full"
                    onClick={() => redirect("/home")}
                  >
                    Get started
                  </RainbowButton>
                )}
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Navbar */}
    </div>
  );
}
