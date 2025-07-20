"use client";

import { useQues } from "@/store/useQues";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const { questions } = useQues();
  const router = useRouter();

  useEffect(() => {
    if (questions.length === 0) {
      router.push("/home");
    }
  }, [questions.length, router]);

  return <>{children}</>;
};

export default Layout;
