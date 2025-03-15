import { cn } from "@/lib/utils";
import { GeistSans } from "geist/font/sans";
import { Suspense } from "react";
import { Toaster as Sooner } from "sonner";
import { Loader } from "../elements";
import { Providers } from "./providers";

// import "@/styles/globals.css";

type AppProviderProps = {
  children: React.ReactNode;
  className?: string;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <main className={cn(GeistSans.className)}>
      <Suspense fallback={<Loader />}>
        <Providers>{children}</Providers>
      </Suspense>
      <Sooner position="top-center" />
    </main>
  );
};
