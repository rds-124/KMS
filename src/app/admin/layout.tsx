import * as React from 'react';
import Link from 'next/link';
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  PanelLeft,
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarContent>
            <SidebarHeader>
              <h2 className="font-headline text-2xl font-semibold">Admin Panel</h2>
            </SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/admin" passHref>
                  <SidebarMenuButton tooltip="Dashboard" isActive={true}>
                    <Home />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/admin/orders" passHref>
                  <SidebarMenuButton tooltip="Orders">
                    <ShoppingCart />
                    <span>Orders</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/admin/products" passHref>
                  <SidebarMenuButton tooltip="Products">
                    <Package />
                    <span>Products</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
               <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Customers">
                    <Users />
                    <span>Customers</span>
                  </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <Link href="/" passHref>
                <SidebarMenuButton tooltip="Back to Store">
                    <PanelLeft />
                    <span>Back to Store</span>
                </SidebarMenuButton>
            </Link>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
                <SidebarTrigger className="md:hidden"/>
                <div className="w-full flex-1">
                    <h1 className="text-lg font-semibold">Admin Dashboard</h1>
                </div>
            </header>
          <main className="flex-1 p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
