"use client";

import { QuesState, useQues } from "@/store/useQues";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const { questions } = useQues() as QuesState;
  const router = useRouter();

  useEffect(() => {
    if (questions.length === 0) {
      router.push("/home");
    }
  }, [questions.length, router]);

  return <>{children}</>;
};

export default Layout;
