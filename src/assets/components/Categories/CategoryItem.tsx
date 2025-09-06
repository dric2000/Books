import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { DialogDescription } from "@radix-ui/react-dialog"
import { Pencil } from "lucide-react"


const CategoryItem = () => {
  return (
    <div className="flex flex-col gap-5 bg-white shadow-lg rounded-2xl p-5">

      <div className="flex flex-row justify-between">
        <img src="/CategoriesImage.png" className="w-50 h-50 object-cover" alt="" />
        <Badge variant="outline" className="h-fit text-sm">10 articles</Badge>
      </div>

      <Separator className="my-2" />

      <div>
        <h1 className="text-2xl font-semibold">Livres et cahiers</h1>
        <p>Dans cette catégorie, on retrouve des livres, des cahiers et autres fournitures de bureau...</p>
      </div>

      <div>
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button className="bg-[#3FB076] hover:bg-green-800">
                <Pencil />
                Modifier
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Modifier la catégorie</DialogTitle>
                <DialogDescription>
                  Mettez à jour les informations de cette catégorie ici
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Nom</Label>
                  <Input id="name-1" name="name" defaultValue="Livres et cahiers" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" defaultValue="Dans cette catégorie, on retrouve des livres, des cahiers et autres fournitures de bureau..." />
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


    </div >
  )
}

export default CategoryItem
