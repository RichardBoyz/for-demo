"use client";
import HomePage from "@/features/home-page/pages/HomePage";
import { initializeParse } from "@/lib/parse";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const test = process.env.JS_KEY;
    const t2 = process.env.NEXT_PUBLIC_JS_KEY;
    console.log(`page ${test}`);
    console.log(`page2 ${t2}`);
    initializeParse();
  }, []);
  return <HomePage />;
}
