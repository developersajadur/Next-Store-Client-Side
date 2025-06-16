import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-orange-500 border-t border-orange-600">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Logo size="md" showText isFooter />
            </div>
            <p className="text-sm text-orange-100 leading-relaxed">
              Next Store is a complete e-commerce kit with all the essential features to quickly build a modern and user-friendly online store.
            </p>
          </div>

          {/* Products Section */}
          <div>
            <h3 className="font-semibold text-white mb-4">Products</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/collections" className="text-orange-100 hover:text-orange-200 transition-colors">
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Shop Section */}
          <div>
            <h3 className="font-semibold text-white mb-4">Shop</h3>
            <ul className="space-y-3">
              <li><Link href="/new-arrivals" className="text-orange-100 hover:text-orange-200 transition-colors">New Arrivals</Link></li>
              <li><Link href="/best-sellers" className="text-orange-100 hover:text-orange-200 transition-colors">Best Sellers</Link></li>
              <li><Link href="/release-dates" className="text-orange-100 hover:text-orange-200 transition-colors">Release Dates</Link></li>
              <li><Link href="/sale" className="text-orange-100 hover:text-orange-200 transition-colors">Sale</Link></li>
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h3 className="font-semibold text-white mb-4">About</h3>
            <ul className="space-y-3">
              <li><Link href="/blog" className="text-orange-100 hover:text-orange-200 transition-colors">Blog</Link></li>
              <li><Link href="/careers" className="text-orange-100 hover:text-orange-200 transition-colors">Careers</Link></li>
              <li><Link href="/investors" className="text-orange-100 hover:text-orange-200 transition-colors">Investors</Link></li>
              <li><Link href="/about" className="text-orange-100 hover:text-orange-200 transition-colors">About</Link></li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="font-semibold text-white mb-4">Help</h3>
            <ul className="space-y-3">
              <li><Link href="/shipping" className="text-orange-100 hover:text-orange-200 transition-colors">Shipping</Link></li>
              <li><Link href="/returns" className="text-orange-100 hover:text-orange-200 transition-colors">Returns</Link></li>
              <li><Link href="/order-status" className="text-orange-100 hover:text-orange-200 transition-colors">Order Status</Link></li>
              <li><Link href="/contacts" className="text-orange-100 hover:text-orange-200 transition-colors">Contacts</Link></li>
            </ul>
          </div>
        </div>

        {/* Social and Legal */}
        <div className="mt-12 pt-8 border-t border-white">
          <div className="w-full flex flex-col md:flex-row justify-between items-center">
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center hover:bg-white hover:text-orange-500 transition-colors">
                <Facebook className="w-5 h-5 text-orange-500" />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center hover:bg-white hover:text-orange-500 transition-colors">
                <Instagram className="w-5 h-5 text-orange-500" />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center hover:bg-white hover:text-orange-500 transition-colors">
                <Twitter className="w-5 h-5 text-orange-500" />
              </Link>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap gap-4 text-sm text-orange-100">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
              <Link href="/data-setting" className="hover:text-white transition-colors">Data Setting</Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex items-center justify-center pt-8 border-t border-white">
          <p className="text-sm text-orange-100 text-center">
            © {new Date().getFullYear()} Next Store - All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}