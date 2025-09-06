import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Search } from "lucide-react"
import CategoryItem from "../components/Categories/CategoryItem"
import { Textarea } from "@/components/ui/textarea"

const Categories = () => {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-3xl font-semibold">Toutes les catégories</h1>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Rechercher une catégorie..."
            className="w-100 h-12 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3FB076] focus:border-[#3FB076] outline-none"
          />
        </div>
        <div>
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button className="bg-[#3FB076] hover:bg-green-800 h-12">
                  <Plus />
                  Nouvelle catégorie
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Nouvelle catégorie</DialogTitle>
                  <DialogDescription>
                    Ajouter les informations d'une nouvelle catégorie ici.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name-1">Nom de la catégorie</Label>
                    <Input id="name-1" name="name" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="username-1">Description</Label>
                    <Textarea id="description-1" name="username" />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Annuler</Button>
                  </DialogClose>
                  <Button type="submit" className="bg-[#3FB076] hover:bg-green-800">Sauvegarder</Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
        </div>
      </div>

    </div>
  )
}

export default Categories
