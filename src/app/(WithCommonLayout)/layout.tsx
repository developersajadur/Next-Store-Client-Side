
import { Footer } from '@/components/shared/Footer';
import { Header } from '@/components/shared/Header';
import { getAllCategoryWithSomeData } from '@/services/(UserServices)/CategoryService';
import React from 'react';

const CommonLayout = async ({ children }: { children: React.ReactNode })  => {
      const categories = await getAllCategoryWithSomeData();
    return (
        <div>
            <header>
               <Header categories={categories}/> 
            </header>
             <main className="min-h-screen container mx-auto px-4 py-6">{children}</main>
             <footer>
                <Footer/>
             </footer>
        </div>
    );
};

export default CommonLayout;