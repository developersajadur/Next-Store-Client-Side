import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

type TNavigationItem = {
  name: string;
  href: string;
};

export const navigationItems: TNavigationItem[] = [
  { name: "HOME", href: "/" },
  { name: "SHOP", href: "/products" },
  { name: "ABOUT US", href: "/about" },
  { name: "CONTACT US", href: "/contact" },
];

const BottomHeader = () => {
    return (
              <div className="hidden md:block bg-gray-50 border-b">
          <div className="container mx-auto px-4">
            <nav className="flex items-center space-x-8 py-3">
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
    );
};

export default BottomHeader;