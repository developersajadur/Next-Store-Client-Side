
import { Header } from '@/components/shared/Header';
import { getAllCategoryWithSomeData } from '@/services/CategoryService';
import React from 'react';

const CommonLayout = async ({ children }: { children: React.ReactNode })  => {
      const categories = await getAllCategoryWithSomeData();
    return (
        <div>
            <header>
               <Header categories={categories}/> 
            </header>
             <main className="min-h-screen">{children}</main>
        </div>
    );
};

export default CommonLayout;