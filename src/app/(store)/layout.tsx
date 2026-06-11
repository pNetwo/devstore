import { Header } from "@/src/components/header";
import { ReactNode } from "react";

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto grid min-h-screen w-full max-w-400 grid-rows-[min-content_max-content] gap-5 px-8 py-8">
      <Header />
      {children}
    </div>
  );
}
