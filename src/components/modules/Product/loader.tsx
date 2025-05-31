"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

type LoaderVariant = "spinner" | "dots" | "pulse" | "skeleton"

interface LoaderProps {
  variant?: LoaderVariant
  size?: "sm" | "md" | "lg"
  color?: string
  className?: string
  text?: string
}

export function Loader({ variant = "spinner", size = "md", color, className, text }: LoaderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  const colorClass = color || "border-primary"
  const spinnerColorClass = color || "border-primary border-t-transparent"

  const renderLoader = () => {
    switch (variant) {
      case "spinner":
        return (
          <div className="flex flex-col items-center justify-center gap-2">
            <div
              className={cn("animate-spin rounded-full border-2", spinnerColorClass, sizeClasses[size], className)}
            />
            {text && <p className={cn("text-muted-foreground", textSizeClasses[size])}>{text}</p>}
          </div>
        )
      case "dots":
        return (
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex space-x-1">
              <div
                className={cn(
                  "animate-bounce rounded-full",
                  colorClass,
                  sizeClasses[size] === "h-4 w-4" ? "h-1 w-1" : sizeClasses[size] === "h-8 w-8" ? "h-2 w-2" : "h-3 w-3",
                  className,
                )}
                style={{ animationDelay: "0ms" }}
              />
              <div
                className={cn(
                  "animate-bounce rounded-full",
                  colorClass,
                  sizeClasses[size] === "h-4 w-4" ? "h-1 w-1" : sizeClasses[size] === "h-8 w-8" ? "h-2 w-2" : "h-3 w-3",
                  className,
                )}
                style={{ animationDelay: "150ms" }}
              />
              <div
                className={cn(
                  "animate-bounce rounded-full",
                  colorClass,
                  sizeClasses[size] === "h-4 w-4" ? "h-1 w-1" : sizeClasses[size] === "h-8 w-8" ? "h-2 w-2" : "h-3 w-3",
                  className,
                )}
                style={{ animationDelay: "300ms" }}
              />
            </div>
            {text && <p className={cn("text-muted-foreground", textSizeClasses[size])}>{text}</p>}
          </div>
        )
      case "pulse":
        return (
          <div className="flex flex-col items-center justify-center gap-2">
            <div className={cn("animate-pulse rounded-full", colorClass, sizeClasses[size], className)} />
            {text && <p className={cn("text-muted-foreground", textSizeClasses[size])}>{text}</p>}
          </div>
        )
      case "skeleton":
        return (
          <div className="flex flex-col items-center justify-center gap-2">
            <div className={cn("animate-pulse rounded-md bg-muted", sizeClasses[size], className)} />
            {text && <p className={cn("text-muted-foreground", textSizeClasses[size])}>{text}</p>}
          </div>
        )
      default:
        return null
    }
  }

  return renderLoader()
}
