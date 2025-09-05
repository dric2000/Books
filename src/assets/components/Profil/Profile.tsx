import { SidebarProvider, 
  SidebarTrigger 
} from "@/components/ui/sidebar";

import { Card } from "@/components/ui/card"

import { Avatar, 
  AvatarImage 
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
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
        <div className="flex w-full bg-gray-100 ">
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
              <Card className="relative rounded-lg w-full mt-4 h-75 bg-[url('/profil.jpg')] bg-cover bg-center">
                <div className="absolute bottom-0 left-0 w-full h-16 bg-white flex items-center px-4">
                  <div className="mb-33">
                    <Avatar className="w-33 h-33 border-3 border-white-200 ">
                      <AvatarImage src="avatar.jpg"/>
                    </Avatar>
                  </div>
                  <div className="ml-6 mb-38">
                    <h2 className="text-4xl font-medium text-white">John Doe</h2>
                    <p className="text-white text-2xl font-medium">Gérant</p>
                  </div>
                  <div className="ml-auto">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" style={{ backgroundColor: "#3FB076" }}>
                      Modifier Profil
                    </button>
                  </div>
                </div>
              </Card>
            </div>
            <div className="border-b mt-4 px-6">
              <nav className="flex gap-6 text-sm font-medium text-gray-600">
                <a href="#" className="border-b-2 border-[#3FB076] pb-2 text-[#3FB076]">
                  Aperçu
                </a>
              </nav>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Documents de la librairie</h3>
                  <Button className="bg-[#3FB076] text-white hover:bg-[#3FB076]">
                    Télécharger
                  </Button>
                </Card>

                
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Stock disponible</h3>
                  <div className="flex justify-between items-center">
                    <div className="h-2 bg-gray-200 rounded w-3/4">
                      <div className="h-2 bg-[#3FB076] rounded w-2/3"></div>
                    </div>
                    <span className="font-bold text-xl">65%</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-2">Articles en stock</p>
                </Card>

                
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Dernières ventes</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>📘 *L'Art de la guerre* – 3 exemplaires</li>
                    <li>📖 *Le Petit Prince* – 5 exemplaires</li>
                    <li>📚 *Les Misérables* – 2 exemplaires</li>
                  </ul>
                </Card>

                
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Commandes effectuées</h3>
                  <p className="text-gray-600 text-sm">Total des commandes gérées par le gérant</p>
                  <span className="text-[#3FB076] font-bold text-2xl">128</span>
                </Card>
              </div>


              
            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-6">Informations personnelles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-base">
                <div>
                  <p className="text-gray-500 mb-1">Nom complet</p>
                  <p className="font-medium">Cokou Jean-Eude</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Date de naissance</p>
                  <p className="font-medium">15 Mai 1997</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Prénom(s)</p>
                  <p className="font-medium">Jean-Eude</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Pays de naissance</p>
                  <p className="font-medium">Bénin</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Sexe</p>
                  <p className="font-medium">Masculin</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Ville de résidence</p>
                  <p className="font-medium">Cotonou</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Nationalité</p>
                  <p className="font-medium">Béninoise</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Personne à contacter</p>
                  <p className="font-medium">Agossou Mireille (+229 90 00 00 00)</p>
                </div>
              </div>
            </Card>
            </div>
          </main>
        </div>
    </SidebarProvider>    
  )
}
export default Profile