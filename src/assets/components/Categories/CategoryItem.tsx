import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useAppDispatch } from "@/hooks/redux.ts"
import { deleteCategory, fetchCategories, updateCategory } from "@/slices/categoriesSlice.ts"
import type { CategoryItemProps } from "@/types"
import { DialogDescription } from "@radix-ui/react-dialog"
import { Pencil, Trash2 } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"



const CategoryItem = ({ category }: CategoryItemProps) => {
  const dispatch = useAppDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [formData, setFormData] = useState({
    libelle: category.libelle,
    description: category.description || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(updateCategory({ id: category.id, categoryData: formData })).unwrap();
      toast.success("Catégorie mise à jour !");
      dispatch(fetchCategories());
      setIsEditOpen(false);
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) return;
    try {
      setIsDeleting(true);
      await dispatch(deleteCategory(category.id)).unwrap();
      toast.success("Catégorie supprimée !");
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <div className="flex flex-col gap-5 bg-white shadow-lg rounded-2xl p-5 h-130 border-2">

      <div className="flex flex-row justify-between">
        <img src="/CategoriesImage.png" className="w-50 h-50 object-cover" alt="" />
        <Badge variant="outline" className="h-fit text-sm"> {category.articles_count} articles</Badge>
      </div>

      <Separator className="my-2" />

      <div className="h-50">
        <h1 className="text-2xl font-semibold h-20"> {category.libelle.toUpperCase()} </h1>
        <p className="h-20"> {category.description} </p>
      </div>

      <div className="flex justify-between items-center">
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogTrigger asChild>
            <div className="flex flex-row justify-between">
              <Button className="bg-[#3FB076] hover:bg-green-800">
                <Pencil />
                Modififer
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleUpdate}>
              <DialogHeader>
                <DialogTitle>Modifier la catégorie</DialogTitle>
                <DialogDescription>
                  Mettez à jour les informations de cette catégorie ici
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Nom</Label>
                  <Input
                    name="libelle"
                    value={formData.libelle}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <DialogFooter className="mt-5">
                <DialogClose asChild>
                  <Button variant="outline" onClick={() => setIsEditOpen(false)}>Annuler</Button>
                </DialogClose>
                <Button type="submit" className="bg-[#3FB076] hover:bg-green-800">Sauvegarder</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <Button
          className="bg-red-500"
          variant="destructive"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          <Trash2 />
          {isDeleting ? "Suppression..." : "Supprimer"}
        </Button>
      </div>


    </div >
  )
}

export default CategoryItem
