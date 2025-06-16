"use client";

import { Toaster } from "sonner";
import UserProvider from "@/contexts/UserContext";
import StoreProvider from "./StoreProvider";
import LoadingAppWrapper from "@/components/Loaders/LoadingAppWrapper";
import { ThemeProvider } from "./ThemeProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <LoadingAppWrapper>
          <StoreProvider>
            <Toaster richColors={true} position="top-right" />
            {children}
          </StoreProvider>
        </LoadingAppWrapper>
      </ThemeProvider>
    </UserProvider>
  );
};

export default Providers;
