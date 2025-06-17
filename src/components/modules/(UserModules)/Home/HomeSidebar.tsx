"use client"

import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TCategorySomeData } from "@/types/category.type";
import Link from "next/link";

type Props = {
  categories: TCategorySomeData[];
};

export function HomeSidebar({ categories }: Props) {
  return (
    <Card className="w-80 p-0 hidden lg:block" style={{ height: "400px" }}>
      <div className="bg-orange-500  text-white p-4">
        <h2 className="font-semibold">BROWSE CATEGORIES</h2>
      </div>
      <div className="p-0 overflow-y-auto" style={{ height: "calc(400px - 60px)" }}>
        {categories.map((category) => (
          <Link href={`/products/categories/${category.slug}`} key={category._id}>
          <Button
            variant="ghost"
            className="w-full justify-between rounded-none border-b border-gray-100 py-3 px-4 text-left hover:bg-gray-50"
          >
            <span>{category.title}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          </Link>
        ))}
      </div>
    </Card>
  )
}
