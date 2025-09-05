import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Outlet } from "react-router"
import Sidebar from "../Dashboard/Sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

function Profile(){
    return(
      <SidebarProvider>
        <div className="flex h-screen w-full bg-background">
          <Sidebar />
          <main className="flex-1 flex flex-col overflow-hidden">
          <header className="h-16 border-b flex items-center px-4">
            <SidebarTrigger />
            <h1 className="text-2xl font-semibold ml-4">Profile</h1>
          </header>
          <nav className="mt-5 ms-5">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/profil">User</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>John Doe</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </nav>
          <div className="mt-5 mx-5">
            <Card className="relative w-full mt-4 h-75 bg-[url('/profil.jpg')] bg-cover bg-center">
              <div className="absolute bottom-0 left-0 w-full h-16 bg-white flex items-center px-4">
                <div className="mb-33">
                  <Avatar className="w-33 h-33 border-3 border-white-200 ">
                    <AvatarImage src="avatar.jpg"/>
                  </Avatar>
                </div>
                <div className="ml-6">
                  <h2 className="text-xl font-bold">John Doe</h2>
                  <p className="text-gray-500">Gérant</p>
                </div>
                <div className="ml-auto">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" style={{ backgroundColor: "#3FB076" }}>
                    Modifier Profil
                  </button>
                </div>
              </div>
            </Card>
          </div>
          <div className="flex-1 overflow-auto p-6">
            <Outlet />
          </div>
          </main>
        </div>
      </SidebarProvider>    
    )
}
export default Profile