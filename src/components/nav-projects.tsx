"use client";

import { MoreHorizontal, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { TopicType } from "@/store/useTopic";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export function NavProjects({
  topic,
  setTRefresh,
}: {
  topic: TopicType[];
  setTRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { isMobile } = useSidebar();

  const router = useRouter();
  const handleClick = (id: string) => {
    router.push(`/home/view?id=${id}`);
  };
  const handleDelete = async (id: string) => {
    try {
      const res = await toast.promise(
        axios.delete(`/api/deleteQuiz?id=${id}`),
        {
          loading: "Deleting quiz...",
          success: <p>Quiz deleted!</p>,
          error: <p>Failed to delete quiz.</p>,
        }
      );
      setTRefresh((prev) => !prev);
      console.log(res.data);
    } catch (err: any) {
      console.error("Delete failed:", err.response?.data || err.message);
    }
  };
  return (
    <>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Recent Quiz</SidebarGroupLabel>
        <SidebarMenu>
          {topic.map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton asChild>
                <p onClick={() => handleClick(item.id)}>
                  <span>{item.topic}</span>
                </p>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem onClick={() => handleDelete(item.id)}>
                    <Trash2 className="text-muted-foreground" />
                    <span>Delete Quiz</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}
