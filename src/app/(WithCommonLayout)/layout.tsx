import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import BottomHeader from "@/components/shared/BottomHeader";
import { getAllCategoryWithSomeData } from "@/services/(UserServices)/CategoryService";
import React from "react";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const categories = await getAllCategoryWithSomeData();
  return (
    <div>
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <Header categories={categories} />
      </header>
      <header className="py-2">
        <BottomHeader />
      </header>
      <main className="min-h-screen container mx-auto px-4 py-6">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default CommonLayout;
