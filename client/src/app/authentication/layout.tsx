"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  return (
    <section className="pt-[2rem] relative">
      <div className="w-full h-[20px] sticky top-[1rem]">
        <button className="underline" onClick={() => router.back()}>
          RETURN
        </button>
      </div>
      {children}
    </section>
  );
}
