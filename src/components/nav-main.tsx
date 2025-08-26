"use client";

import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useClear } from "@/store/useClear";
import { QuesState, useQues } from "@/store/useQues";
import useTopic from "@/store/useTopic";
import { LucideIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const { clearInput } = useClear();
  const { clearQues } = useQues() as QuesState;
  const { topic } = useTopic();
  const [openSearch, setOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTopics = topic.filter((t) =>
    t.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );
  useEffect(() => {
    setSearchQuery("");
  }, []); 
  useEffect(() => {
    filteredTopics;
  }, [searchQuery]);

  return (
    <SidebarGroup>
      {openSearch && (
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm"
        onClick={() => setOpenSearch(false)}
      >
        <div
        className="bg-white dark:bg-gray-800 rounded-xl p-6 w-130 h-96 shadow-2xl border border-gray-200 dark:border-gray-600 flex flex-col"
        onClick={(e) => e.stopPropagation()}
        >
        <div className="flex justify-between items-center mb-6 gap-4 align-middle">
          <input
          type="text"
          placeholder="Search quiz..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 p-3 border-0 rounded-lg focus:outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
          />
          <button
          onClick={() => setOpenSearch(false)}
          className="text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 text-xl font-light flex-shrink-0 scale-150"
          >
          ×
          </button>
        </div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
          Available Quiz:
        </h3>
        <div className="flex-1 overflow-y-auto rounded-lg [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:dark:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-gray-500 [&::-webkit-scrollbar-thumb:hover]:dark:bg-gray-500">
          <ul className="space-y-2">
          {filteredTopics.map((topicItem) => (
          <li
          key={topicItem.id}
          onClick={() => {
            setOpenSearch(false);
            redirect(`/home/view?id=${topicItem.id}`)
          }}
          className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer text-gray-900 dark:text-gray-100 transition-colors duration-150"
          >
          {topicItem.topic.split(" ").slice(0, 3).join(" ")}
          </li>
          ))}
          {filteredTopics.length === 0 && (
          <li className="p-3 text-gray-500 dark:text-gray-400">
          No results found.
          </li>
          )}
          </ul>
        </div>
        </div>
      </div>
      )}
      <SidebarMenu>
      {items.map((item) => (
        <Collapsible
        key={item.title}
        asChild
        defaultOpen={item.isActive}
        className="group/collapsible"
        >
        <SidebarMenuItem>
          <SidebarMenuButton
          tooltip={item.title}
          onClick={() => {
            if (item.url == "/home") {
            clearInput();
            clearQues();
            redirect("/home");
            }
            if (item.url == "/home/search") {
            setOpenSearch(true);
            }
          }}
          >
          {item.icon && <item.icon />}
          <span>{item.title}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        </Collapsible>
      ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
