import { Sidebar as MySidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";

import {
  ChartBarStacked,
  Home,
  Package,
  Settings,
  ShoppingCart
} from "lucide-react";

import NavItem from "./NavItem";

const Sidebar = () => {
  const navItems = [
    {
      title: "Tableau de bord",
      icon: Home,
      href: "/dashboard",
      items: []
    },
    {
      title: "Categories",
      icon: ChartBarStacked,
      href: "/dashboard/categories",
      items: []
    },
    {
      title: "Produits",
      icon: Package,
      href: "/dashboard/productsList",
      items: []
    },
    {
      title: "Ventes",
      icon: ShoppingCart,
      href: "/dashboard/sales",
      items: []
    },
    {
      title: "Profil",
      icon: Settings,
      href: "/dashboard/profil",
      items: []
    }
  ];

  return (
    <MySidebar>

      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="w-8 h-8 bg-[#3FB076] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">DB</span>
          </div>
          <div>
            <h2 className="font-semibold">Tableau de bord</h2>
            <p className="text-sm text-muted-foreground">Administration</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <nav className="flex flex-col gap-1 p-2">
          {navItems.map((item) => (
            <NavItem 
              key={item.href}
              title={item.title}
              icon={item.icon}
              href={item.href}
            />
          ))}
        </nav>
      </SidebarContent>


    </MySidebar>
  )
}

export default Sidebar
