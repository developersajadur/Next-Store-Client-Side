// app/providers.tsx or similar
"use client";

import { useUser } from "@/contexts/UserContext";
import Loader from "./Loader";

const LoadingAppWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useUser();

  if (isLoading) return <Loader />;

  return <>{children}</>;
};

export default LoadingAppWrapper;
