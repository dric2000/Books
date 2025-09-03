import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface NavItemProps {
  title: string;
  icon: LucideIcon;
  href: string;
}
const NavItem = ({ title, icon: Icon, href }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-green-100",
        isActive && "bg-green-100 text-accent-foreground"
      )}
    >
      <Icon className="h-4 w-4" />
      {title}
    </Link>
  )
}

export default NavItem
