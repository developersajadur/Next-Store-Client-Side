"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  User,
  ShoppingBag,
  CreditCard,
  Settings,
  Menu,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { TUser } from "@/types";
import { logout } from "@/services/(UserServices)/AuthService";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";

// Sidebar menu items
const menuItems = [
  { title: "My Account", icon: User, href: "/profile" },
  { title: "My Orders", icon: ShoppingBag, href: "/profile/my-orders" },
  {
    title: "Payment History",
    icon: CreditCard,
    href: "/profile/payments-history",
  },
  { title: "Settings", icon: Settings, href: "/profile/settings" },
];

export function ProfileSidebar({ userData }: { userData: TUser }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger Menu */}
      <div className="md:hidden p-4 border-b flex justify-between items-center">
        <h1 className="text-lg font-semibold">Menu</h1>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent
              userData={userData}
              pathname={pathname}
              onNavigate={() => setOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 border-r bg-white">
        <SidebarContent userData={userData} pathname={pathname} />
      </aside>
    </>
  );
}

function SidebarContent({
  userData,
  pathname,
  onNavigate,
}: {
  userData: TUser;
  pathname: string;
  onNavigate?: () => void;
}) {
  const router = useRouter();
   const { setIsLoading } = useUser();

  const handleLogout = async () => {
    await logout();
    setIsLoading(true);
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <div className="h-full flex flex-col justify-between">
      {/* Top section: Avatar and links */}
      <div>
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={userData.profileImage} alt={userData.name} />
              <AvatarFallback>
                {userData.name?.slice(0, 2).toUpperCase() || "NA"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-muted-foreground">Hello</p>
              <p className="font-semibold">{userData.name}</p>
            </div>
          </div>
        </div>

        <nav className="mt-4 space-y-1 px-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
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
            );
          })}

          {/* Logout Button Styled as a Link */}
          <button
            onClick={() => {
              handleLogout();
            }}
            className="mt-2 w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition cursor-pointer"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
}
