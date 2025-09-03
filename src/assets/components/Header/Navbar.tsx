import { NavigationMenu, NavigationMenuContent, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { NavigationMenuItem, NavigationMenuLink } from "@radix-ui/react-navigation-menu"

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-20 py-10">
      <div className="flex justify-center items-center">
        <h1 className="text-3xl font-semi-bold">B</h1>
        <span className="text-2xl text-[#3FB076] font-bold">oo</span>
        <h1 className="text-3xl font-semi-bold">ks</h1>
      </div>
      <div>

        <NavigationMenu>
          <NavigationMenuList className="gap-8 text-xl">

            <NavigationMenuItem>
              <NavigationMenuLink href="/books">
                A propos de nous
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink href="/books">
                Contactez-nous
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-xl">Nos livres</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Aventures</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

      </div>
    </div >
  )
}

export default Navbar
