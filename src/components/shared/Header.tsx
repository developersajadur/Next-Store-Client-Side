"use client"

import { useState } from "react"
import { Search, Menu, User, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Logo } from "./Logo"

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

const navigationItems = [
  { name: "HOME", href: "/" },
  { name: "SHOP", href: "/shop" },
  { name: "BLOG", href: "/blog" },
  { name: "ABOUT US", href: "/about" },
  { name: "CONTACT US", href: "/contact" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="w-full bg-white border-b">
      {/* Top Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Logo />

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="flex w-full">
              <Input type="text" placeholder="Search for products" className="rounded-r-none border-r-0" />
              <Select>
                <SelectTrigger className="w-48 rounded-none border-l-0 border-r-0">
                  <SelectValue placeholder="SELECT CATEGORY" />
                </SelectTrigger>
                <SelectContent className="max-h-48 overflow-y-auto">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="rounded-l-none bg-gray-100 hover:bg-gray-200 text-gray-600">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Desktop Login/Register */}
            <div className="hidden lg:block">
              <Button variant="ghost" className="text-sm">
                LOGIN / REGISTER
              </Button>
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="relative hidden sm:flex">
                <Heart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-orange-500 text-white text-xs">
                  0
                </Badge>
              </Button>
              <Button variant="ghost" size="icon" className="relative hidden sm:flex">
                <User className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-orange-500 text-white text-xs">
                  0
                </Badge>
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-orange-500 text-white text-xs">
                  0
                </Badge>
              </Button>
              <div className="hidden sm:block text-sm font-medium">৳0.00</div>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  {/* Mobile Search */}
                  <div className="mb-6">
                    <div className="flex">
                      <Input type="text" placeholder="Search for products" className="rounded-r-none" />
                      <Button className="rounded-l-none bg-gray-100 hover:bg-gray-200 text-gray-600">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Tabs */}
                  <Tabs defaultValue="menu" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger
                        value="menu"
                        className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                      >
                        MENU
                      </TabsTrigger>
                      <TabsTrigger value="categories">CATEGORIES</TabsTrigger>
                    </TabsList>

                    <TabsContent value="menu" className="mt-4">
                      <div className="space-y-2">
                        {navigationItems.map((item) => (
                          <Button
                            key={item.name}
                            variant="ghost"
                            className="w-full justify-start text-left"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.name}
                          </Button>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="categories" className="mt-4">
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <Button
                            key={category}
                            variant="ghost"
                            className="w-full justify-start text-left text-sm"
                            onClick={() => setIsOpen(false)}
                          >
                            {category}
                          </Button>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Desktop Navigation - Only Menu Items */}
      <div className="hidden md:block bg-gray-50 border-t">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-8 py-3">
            {/* Navigation Items Only */}
            {navigationItems.map((item) => (
              <Button key={item.name} variant="ghost" className="text-sm font-medium">
                {item.name}
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
