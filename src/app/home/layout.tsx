// app/home/layout.tsx
"use client";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { Loader } from "@/components/ui/Loader";
import { HomeNavBar } from "@/components/HomeNavBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { HomeSidebar } from "@/components/HomeSidebar";

export default function HomeLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  if (status === "loading") return <Loader />;
  if (!session) return redirect("/");
  return (
    <>
      <SidebarProvider>
        {/* <div className="sticky top-0 -left-100 z-10 "></div> */}
        <HomeSidebar />
        <main className="w-full px-3">
          <div className="flex flex-row-reverse">
            <HomeNavBar />
            <SidebarTrigger />
          </div>
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
