// app/home/layout.tsx
"use client";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
