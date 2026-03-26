"use client"
import React from 'react'
import { SidebarProvider } from '@/components/ui/sidebar';
import AppHeader from '../_components/AppHeader';
import { AppSidebar } from '../_components/AppSidebar';

function DashboardProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className='w-full ml-56'>
                <AppHeader />
                <div className='p-10'>{children}</div>
            </main>
        </SidebarProvider>
    )
}

export default DashboardProvider