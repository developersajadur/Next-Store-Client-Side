"use client"

import type * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Package, Users, ShoppingCart, CreditCard, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Logo } from "./Logo"

// Menu items
const items = [
  {
    title: "Dashboard",
    url: "/dashboard/analysis",
    icon: BarChart3,
  },
  {
    title: "Products",
    url: "/dashboard/manage-products",
    icon: Package,
  },
  {
    title: "Orders",
    url: "/dashboard/manage-orders",
    icon: ShoppingCart,
  },
  {
    title: "Payments",
    url: "/dashboard/manage-payments",
    icon: CreditCard,
  },
  {
    title: "Users",
    url: "/dashboard/manage-users",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/dashboard/manage-settings",
    icon: Settings,
  },
]

export function AdminDashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo/>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
