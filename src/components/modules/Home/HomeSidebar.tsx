"use client"

import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const categories = [
  "Game Pad",
  "Accessories",
  "Keyboard",
  "Switches",
  "Gaming Headset",
  "Mouse",
  "Mousepad",
  "Camera",
  "Gaming Chair",
  "Laptop",
  "Monitor",
]

export function HomeSidebar() {
  return (
    <Card className="w-80 p-0 hidden lg:block" style={{ height: "400px" }}>
      <div className="bg-orange-500 text-white p-4">
        <h2 className="font-semibold">BROWSE CATEGORIES</h2>
      </div>
      <div className="p-0 overflow-y-auto" style={{ height: "calc(400px - 60px)" }}>
        {categories.map((category, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-between rounded-none border-b border-gray-100 py-3 px-4 text-left hover:bg-gray-50"
          >
            <span>{category}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        ))}
      </div>
    </Card>
  )
}
