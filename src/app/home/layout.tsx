// app/home/layout.tsx
"use client";
import { redirect } from "next/navigation";
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

export default function HomeLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  if (status === "loading") return <Loader />;
  if (!session) return redirect("/");
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex px-4 flex-col-reverse mt-8">
              <SidebarTrigger className="z-3" />

              <div className="flex justify-center items-center gap-2">
                <BrainCircuit className="sm:hidden" size={35} />
                <h1 className="font-josefin-sans text-2xl text-center">
                  Quizium
                </h1>
              </div>
            </div>
          </header>
          <main>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
