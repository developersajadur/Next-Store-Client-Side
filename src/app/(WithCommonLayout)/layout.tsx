
import { Header } from '@/components/shared/Header';
import React from 'react';

const CommonLayout = ({ children }: { children: React.ReactNode })  => {
    return (
        <div>
            <header>
               <Header/>
            </header>
             <main className="min-h-screen">{children}</main>
        </div>
    );
};

export default CommonLayout;