"use client";

import { Toaster } from "sonner";
import UserProvider from "@/contexts/UserContext";
import StoreProvider from "./StoreProvider";
import LoadingAppWrapper from "@/components/Loaders/LoadingAppWrapper";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <LoadingAppWrapper>
        <StoreProvider>
          <Toaster richColors={true} position="top-right" />
          {children}
        </StoreProvider>
      </LoadingAppWrapper>
    </UserProvider>
  );
};

export default Providers;
