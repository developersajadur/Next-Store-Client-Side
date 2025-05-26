"use client";

import { Toaster } from "sonner";
import UserProvider from "@/contexts/UserContext";
import StoreProvider from "./StoreProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <Toaster richColors={true} position="top-right" />
      <UserProvider>{children}</UserProvider>
    </StoreProvider>
  );
};

export default Providers;
