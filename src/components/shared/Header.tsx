"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Menu, User, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "./Logo";
import { TCategorySomeData } from "@/types/category.type";
import Link from "next/link";

type TNavigationItem = {
  name: string;
  href: string;
};

const navigationItems: TNavigationItem[] = [
  { name: "HOME", href: "/" },
  { name: "SHOP", href: "/products" },
  { name: "BLOG", href: "/blogs" },
  { name: "ABOUT US", href: "/about" },
  { name: "CONTACT US", href: "/contact" },
];

type Props = {
  categories: TCategorySomeData[];
};

export function Header({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentCategoryFromUrl = pathname.startsWith("/products/categories/")
    ? pathname.replace("/products/categories/", "")
    : "";

  const [selectedCategory, setSelectedCategory] = useState(
    currentCategoryFromUrl
  );
  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    if (currentCategoryFromUrl) {
      setSelectedCategory(currentCategoryFromUrl);
    }
  }, [currentCategoryFromUrl]);

  // Submit handler for search form
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }

    router.push(`/products?${params.toString()}`);
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b">
      {/* Top Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Logo />

          {/* Search Bar - Hidden on mobile */}
          <form
            onSubmit={onSubmit}
            className="hidden md:flex flex-1 max-w-2xl mx-8"
          >
            <div className="flex w-full">
              <Input
                type="text"
                placeholder="Search for products"
                className="rounded-r-none border-r-0"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Select
                value={selectedCategory || ""}
                onValueChange={(value) => {
                  setSelectedCategory(value);
                  router.push(`/products/categories/${value}`);
                }}
              >
                <SelectTrigger className="w-48 rounded-none border-l-0 border-r-0 cursor-pointer">
                  <SelectValue placeholder="SELECT CATEGORY" />
                </SelectTrigger>
                <SelectContent className="max-h-48 overflow-y-auto">
                  {categories.map((category) => (
                    <SelectItem
                      className="cursor-pointer"
                      key={category._id}
                      value={category.slug.toLowerCase()}
                    >
                      {category.title.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="submit"
                className="rounded-l-none bg-gray-100 hover:bg-gray-200 text-gray-600"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

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
              <Button
                variant="ghost"
                size="icon"
                className="relative hidden sm:flex"
              >
                <Heart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-orange-500 text-white text-xs">
                  0
                </Badge>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative hidden sm:flex"
              >
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
                  <form onSubmit={onSubmit} className="mb-6">
                    <div className="flex">
                      <Input
                        type="text"
                        placeholder="Search for products"
                        className="rounded-r-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <Button
                        type="submit"
                        className="rounded-l-none bg-gray-100 hover:bg-gray-200 text-gray-600"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>

                  {/* Tabs */}
                  <Tabs defaultValue="menu" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger
                        value="menu"
                        className="data-[state=active]:bg-orange-500 cursor-pointer data-[state=active]:text-white"
                      >
                        MENU
                      </TabsTrigger>
                      <TabsTrigger
                        className="cursor-pointer"
                        value="categories"
                      >
                        CATEGORIES
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="menu" className="mt-4 cursor-pointer">
                      <div className="space-y-2">
                        {navigationItems.map((item) => (
                          <Link key={item.name} href={item.href}>
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-left"
                              onClick={() => setIsOpen(false)}
                            >
                              {item.name}
                            </Button>
                          </Link>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent
                      value="categories"
                      className="mt-4 cursor-pointer"
                    >
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <Link
                            href={`/products/categories/${category.slug}`}
                            key={category._id}
                            className="block px-4 py-2 rounded hover:bg-gray-100 cursor-pointer"
                            onClick={() => setIsOpen(false)} // Close sheet on click, optional
                          >
                            {category.title.toLocaleUpperCase()}
                          </Link>
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
              <Link key={item.name} href={item.href}>
                <Button variant="ghost" className="text-sm font-medium">
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
