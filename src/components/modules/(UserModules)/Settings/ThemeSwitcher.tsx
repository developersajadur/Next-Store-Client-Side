"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useTheme } from "next-themes"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <Label>Theme</Label>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant={theme === "light" ? "default" : "outline"}
            onClick={() => setTheme("light")}
            className="flex flex-col items-center justify-center p-6 h-auto space-y-2"
          >
            <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300" />
            <span className="text-sm font-medium">Light</span>
          </Button>
          <Button
            variant={theme === "dark" ? "default" : "outline"}
            onClick={() => setTheme("dark")}
            className="flex flex-col items-center justify-center p-6 h-auto space-y-2"
          >
            <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-600" />
            <span className="text-sm font-medium">Dark</span>
          </Button>
        </div>
      </div>

      <div className="pt-4 p-4 border rounded-lg bg-muted/30">
        <p className="text-sm text-muted-foreground">
          <strong>Current theme:</strong> {theme === "light" ? "Light" : "Dark"} mode
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Changes will be applied immediately across the site
        </p>
      </div>
    </div>
  )
}