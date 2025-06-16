"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  User,
  ShoppingBag,
  CreditCard,
  Settings,
  Menu,
} from "lucide-react"
import { useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

const menuItems = [
  { title: "My Account", icon: User, href: "/profile" },
  { title: "My Orders", icon: ShoppingBag, href: "/profile/my-orders" },
  // { title: "Reviews", icon: Star, href: "/profile/reviews" },
  // { title: "Wishlist", icon: Heart, href: "/profile/wishlist" },
  { title: "Payment History", icon: CreditCard, href: "/profile/payments-history" },
  { title: "Settings", icon: Settings, href: "/profile/settings" },
]

export function ProfileSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile hamburger button */}
      <div className="md:hidden p-4 border-b flex justify-between items-center">
        <h1 className="text-lg font-semibold">Menu</h1>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent pathname={pathname} onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:block w-64 border-r bg-white">
        <SidebarContent pathname={pathname} />
      </aside>
    </>
  )
}

function SidebarContent({
  pathname,
  onNavigate,
}: {
  pathname: string
  onNavigate?: () => void
}) {
  return (
    <div className="h-full">
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/images/profile-avatar.png" alt="Kazi Mahbub" />
            <AvatarFallback>KM</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-muted-foreground">Hello</p>
            <p className="font-semibold">Kazi Mahbub</p>
          </div>
        </div>
      </div>

      <nav className="mt-4 space-y-1 px-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.title}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 transition",
                isActive && "bg-gray-100 text-orange-600"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
