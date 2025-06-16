import { ShoppingBag } from "lucide-react";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  isFooter?: boolean; // New prop to switch to footer style
}

export function Logo({ size = "md", showText = true, isFooter = false }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <Link href="/" className="flex items-center space-x-2">
      <div
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center ${
          isFooter ? "bg-black" : "bg-orange-500"
        }`}
      >
        <ShoppingBag className={`w-1/2 h-1/2 ${isFooter ? "text-white" : "text-white"}`} />
      </div>
      {showText && (
        <div>
          <h1
            className={`${textSizeClasses[size]} font-bold ${
              isFooter ? "text-black" : "text-gray-900"
            }`}
          >
            NEXT
          </h1>
          <p className={`${isFooter ? "text-gray-700" : "text-orange-600"} text-sm`}>STORE</p>
        </div>
      )}
    </Link>
  );
}
