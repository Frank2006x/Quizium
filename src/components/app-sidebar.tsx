"use client";

import * as React from "react";
import { BrainCircuit, SearchIcon, SquarePen } from "lucide-react";
import { Loader } from "@/components/ui/Loader";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import useTopic from "@/store/useTopic";
import Link from "next/link";
import TopicLoader from "./TopicLoader";

const data = {
  navMain: [
    {
      title: "New Quiz",
      url: "/home",
      icon: SquarePen,
      isActive: true,
    },
    {
      title: "Search Quiz",
      url: "#",
      icon: SearchIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession();
  const user = session?.user;
  const { topic, setTopic, isLoading } = useTopic();
  React.useEffect(() => {
    setTopic();
  }, [setTopic]);

  if (status === "loading") return <Loader />;
  if (!session) return redirect("/");

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href="/">
          <BrainCircuit size={35} />
        </Link>
      </SidebarHeader>
      <SidebarContent className="mt-7">
        <NavMain items={data.navMain} />
        {isLoading ? <TopicLoader /> : <NavProjects topic={topic} />}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user!} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
