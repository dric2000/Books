import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { addCategory, fetchCategories } from "@/slices/categoriesSlice"
import type { Category } from "@/types"
import { Plus, Search } from "lucide-react"
import { useEffect, useState } from "react"
import CategoryItem from "../components/Categories/CategoryItem"
import toast from "react-hot-toast";

const Categories = () => {

  const dispatch = useAppDispatch();
  const { items, isLoading, error } = useAppSelector((state) => state.categories);

  const [formData, setFormData] = useState({
    libelle: "",
    description: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.libelle.trim()) {
      alert("Le nom de la catégorie est requis");
      return;
    }

    try {
      // Transformez les données pour qu'elles correspondent à l'API
      const apiData = {
        libelle: formData.libelle, // Transformation ici
        description: formData.description
      };

      console.log('🔄 Données transformées pour API:', apiData);

      const result = await dispatch(addCategory(apiData)).unwrap();
      toast.success("Catégorie ajoutée !")
      console.log('✅ Réponse API:', result);

      setFormData({ libelle: "", description: "" });
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
    }
  };


  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur de chargement des données</div>
  }


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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#3FB076] hover:bg-green-800 h-12" onClick={() => setIsDialogOpen(true)}>
                <Plus />
                Nouvelle catégorie
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>Nouvelle catégorie</DialogTitle>
                  <DialogDescription>
                    Ajouter les informations d'une nouvelle catégorie ici.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name-1">Nom de la catégorie</Label>
                    <Input
                      name="libelle"
                      id="libelle"
                      value={formData.libelle}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      name="description"
                      id="description"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <DialogFooter className="mt-5">
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFormData({ libelle: "", description: "" });
                        setIsDialogOpen(false);
                      }}
                    >
                      Annuler
                    </Button>
                  </DialogClose>
                  <Button type="submit" className="bg-[#3FB076] hover:bg-green-800">Sauvegarder</Button>
                </DialogFooter>
              </form>
            </DialogContent>

          </Dialog>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-15">
          {
            items.map((category: Category) => (
              <div key={category.id}>
                <CategoryItem category={category} />
              </div>
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Categories
