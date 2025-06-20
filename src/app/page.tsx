"use client";
import React from "react";
import { signIn, signOut } from "next-auth/react";
const Page = () => {
  return (
    <div>
      page
      <button
        onClick={() =>
          signIn("google", { callbackUrl: "/", prompt: "select_account" })
        }
      >
        Sign in with Google
      </button>
      <button onClick={() => signOut({ redirectTo: "/" })}>Sign Out</button>
    </div>
  );
};

export default Page;
