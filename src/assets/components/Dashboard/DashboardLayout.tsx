import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.ts";
import { fetchCurrentUser, logoutUser } from "@/slices/authSlice.ts";
import { Bell, LogOut, Settings } from "lucide-react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "@/slices/darkModeSlice";



const DashboardLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const mode = useSelector((state: any) => state.darkMode.mode);

  const { user, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() =>{
    if(mode){
      document.documentElement.classList.add("dark");
    }else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode])
  useEffect(() => {
    if (!user) {
      dispatch(fetchCurrentUser())
    }
  }, [dispatch, user])


  const getUserFullName = (user: any) => {
    if (!user?.data) return "Utilisateur"; // ← String
    const firstName = user.data.prenom || "";
    const lastName = user.data.nom || "";
    return `${firstName} ${lastName}`.trim() || user.data.email || "Utilisateur"; // ← String
  };



  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/connexion-admin");
  }
  return (
    <SidebarProvider>
      <div className="flex bg-background w-full">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden min-w-0">
          <header className="h-20 border-b flex justify-between items-center px-4 flex-shrink-0">
            <div className="flex items-center gap-1">
              <SidebarTrigger />
              <h1 className="text-2xl font-semibold ml-4">Tableau de bord</h1>
            </div>
            <div>
              <Menubar className="p-6 ">

                <MenubarMenu>
                  <MenubarTrigger>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="dark-mode"
                        checked={mode}                     
                        onCheckedChange={() => dispatch(toggleDarkMode())}
                      />
                      <Label htmlFor="dark-mode">Mode sombre</Label>
                    </div>
                  </MenubarTrigger>
                </MenubarMenu>

                <MenubarMenu>
                  <MenubarTrigger>
                    <Bell />
                  </MenubarTrigger>
                </MenubarMenu>


                <MenubarMenu>
                  <MenubarTrigger>
                    <Settings />
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>New Window</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Share</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Print</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>

                <Separator orientation="vertical" />

                <MenubarMenu>
                  <MenubarTrigger>
                    {isLoading ? "Chargement..." : getUserFullName(user)}
                    <Avatar className="ml-5">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CB</AvatarFallback>
                    </Avatar>
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      Profil <MenubarShortcut>⌘T</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>Paramètres</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Sécurité</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem className="text-red-600" onClick={handleLogout}>
                      <LogOut className="text-red-600" />
                      Déconnexion
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>


              </Menubar>
            </div>
          </header>
          <div className="flex-1 overflow-auto p-6 w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default DashboardLayout