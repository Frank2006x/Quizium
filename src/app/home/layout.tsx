// app/home/layout.tsx
"use client";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { Loader } from "@/components/ui/Loader";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { BrainCircuit } from "lucide-react";
import { ModeToggle } from "@/components/ThemeToggler";
import { Toaster } from "react-hot-toast";

export default function HomeLayout({ children }: { children: ReactNode }) {
  const { status } = useSession();

  if (status === "loading") return <Loader />;

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 max-w-screen shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex px-4 flex-col-reverse mt-8">
              <SidebarTrigger className="z-5" />
              <Toaster position="top-center" containerClassName="z-10" />
              <div className="flex justify-center items-center gap-2">
                <BrainCircuit className="sm:hidden" size={35} />
                <h1 className="font-josefin-sans text-2xl text-center">
                  Quizium
                </h1>
              </div>
            </div>
            <div className="fixed right-4 top-4">
              <ModeToggle />
            </div>
          </header>
          <main className="flex flex-1">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
