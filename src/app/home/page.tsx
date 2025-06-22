"use client";
import { useSession } from "next-auth/react";
import React from "react";
import Loading from "../loading";
import { redirect } from "next/navigation";
import { Loader } from "@/components/ui/Loader";

const Home = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <Loader />;
  if (!session) return redirect("/");
  return <div>Home</div>;
};

export default Home;
