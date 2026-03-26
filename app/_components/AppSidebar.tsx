import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Calendar, Inbox, Layers, UserCircle, Wallet } from "lucide-react"
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const items = [
    { title: "Workspace", url: "/dashboard", icon: Layers },
    { title: "AI Tools", url: "/ai-tools", icon: Inbox },
    { title: "My History", url: "/my-history", icon: Calendar },
    { title: "Billing", url: "/billing", icon: Wallet },
    { title: "Profile", url: "/profile", icon: UserCircle },
]

export function AppSidebar() {
    const path = usePathname();
    return (
        <div className="group/sidebar relative h-screen">
            <div className="absolute left-0 top-0 h-full w-12 group-hover/sidebar:w-56 transition-all duration-300 bg-white shadow-md overflow-hidden z-50">
                <div className='p-4 flex justify-center group-hover/sidebar:justify-start'>
                    <Image src={'/logo.png'} alt='logo' width={100} height={70}
                        className='hidden group-hover/sidebar:block' />
                </div>
                <div className='mt-4 flex flex-col gap-1'>
                    {items.map((item, index) => (
                        <a href={item.url} key={index}
                            className={`p-3 flex gap-3 items-center hover:bg-gray-100 rounded-lg mx-1
                            ${path.includes(item.url) ? 'bg-gray-200' : ''}`}>
                            <item.icon className='h-5 w-5 flex-shrink-0' />
                            <span className='hidden group-hover/sidebar:block text-sm whitespace-nowrap'>
                                {item.title}
                            </span>
                        </a>
                    ))}
                </div>
                <div className='absolute bottom-4 left-0 w-full px-2'>
                    <p className='hidden group-hover/sidebar:block text-gray-400 text-xs text-center'>
                        Copyright @SulemanAbu
                    </p>
                </div>
            </div>
        </div>
    )
}