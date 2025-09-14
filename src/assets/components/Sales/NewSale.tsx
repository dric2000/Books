import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { useSales } from "@/hooks/useSales";
import type { NewSaleModalProps, SalesFormData } from "@/types";
import { Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const NewSale = ({ open, onOpenChange, onSuccess, clients, products }: NewSaleModalProps) => {
  const [error, setError] = useState<string | null>(null);

  const { createFromFormData, loading } = useSales(false);

  // État initial du formulaire
  const [formData, setFormData] = useState<SalesFormData>({
    client: null,
    ligne_commandes: [{ article: null, quantite: 1, prix_unitaire: 0 }],
  });

  // Réinitialiser le formulaire quand le modal est fermé
  useEffect(() => {
    if (!open) {
      setFormData({
        client: null,
        ligne_commandes: [{ article: null, quantite: 1, prix_unitaire: 0 }],
      });
      setError(null);
    }
  }, [open]);

  // Ajouter une ligne de commande
  const addLigne = () => {
    setFormData({
      ...formData,
      ligne_commandes: [
        ...formData.ligne_commandes,
        { article: null, quantite: 1, prix_unitaire: 0 },
      ],
    });
  };

  // Supprimer une ligne de commande
  const removeLigne = (index: number) => {
    if (formData.ligne_commandes.length <= 1) return;

    const newLignes = [...formData.ligne_commandes];
    newLignes.splice(index, 1);

    setFormData({
      ...formData,
      ligne_commandes: newLignes,
    });
  };

  // Mettre à jour une ligne de commande
  const updateLigne = (index: number, field: string, value: any) => {
    const newLignes = [...formData.ligne_commandes];

    if (field === "article") {
      const selectedArticle = products.find(a => a.id === parseInt(value));
      newLignes[index] = {
        ...newLignes[index],
        article: selectedArticle || null,
        prix_unitaire: selectedArticle?.prix || 0,
      };
    } else {
      newLignes[index] = {
        ...newLignes[index],
        [field]: value,
      };
    }

    setFormData({
      ...formData,
      ligne_commandes: newLignes,
    });
  };

  // Calculer le total d'une ligne
  const calculateLigneTotal = (ligne: SalesFormData["ligne_commandes"][0]) => {
    return (ligne.quantite || 0) * (ligne.prix_unitaire || 0);
  };

  // Calculer le total général
  const calculateTotal = () => {
    return formData.ligne_commandes.reduce(
      (sum, ligne) => sum + calculateLigneTotal(ligne),
      0
    );
  };

  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.client) {
      setError("Veuillez sélectionner un client");
      return;
    }

    for (let i = 0; i < formData.ligne_commandes.length; i++) {
      const ligne = formData.ligne_commandes[i];
      if (!ligne.article) {
        setError(`Veuillez sélectionner un article pour la ligne ${i + 1}`);
        return;
      }
      if (ligne.quantite <= 0) {
        setError(`La quantité doit être supérieure à 0 pour la ligne ${i + 1}`);
        return;
      }
    }

    try {

      // Utilisation de la fonction createFromFormData qui fait la transformation
      await createFromFormData(formData);

      toast.success("Commande créée avec succès !");

      // Fermer le modal et callback
      onOpenChange(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      console.error("Erreur lors de la création:", err);
      setError(err.message || "Une erreur s'est produite lors de la création de la commande");
      toast.error("Erreur lors de l'ajout de la commande");
    }
  };


  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Créer une nouvelle commande</DialogTitle>
            <DialogDescription>
              Remplissez les informations ci-dessous pour enregistrer une nouvelle commande.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            {/* Sélection du client */}
            <div className="space-y-2">
              <Label htmlFor="client">Client *</Label>
              <select
                value={formData.client ? clients.findIndex(c => c === formData.client).toString() : ""}
                onChange={(e) => {
                  const selectedIndex = parseInt(e.target.value);
                  if (!isNaN(selectedIndex) && selectedIndex >= 0) {
                    const selectedClient = clients[selectedIndex];
                    setFormData({ ...formData, client: selectedClient });
                  } else {
                    setFormData({ ...formData, client: null });
                  }
                }}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionnez un client</option>
                {clients.map((client, index) => (
                  <option key={index} value={index.toString()}>
                    {client.prenom} {client.nom} ({client.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Lignes de commande */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Articles commandés *</Label>
                <Button type="button" variant="outline" size="sm" onClick={addLigne}>
                  <Plus size={14} className="mr-1" /> Ajouter une ligne
                </Button>
              </div>

              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Article</TableHead>
                      <TableHead>Quantité</TableHead>
                      <TableHead>Prix unitaire</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead className="w-[60px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formData.ligne_commandes.map((ligne, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Select
                            value={ligne.article?.id.toString() || ""}
                            onValueChange={(value) => updateLigne(index, "article", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez un article" />
                            </SelectTrigger>
                            <SelectContent>
                              {products.map((product) => (
                                <SelectItem key={product.id} value={product.id.toString()}>
                                  {product.titre} - {product.prix.toLocaleString("fr-FR", {
                                    style: "currency",
                                    currency: "EUR",
                                  })}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="1"
                            value={ligne.quantite}
                            onChange={(e) => updateLigne(index, "quantite", parseInt(e.target.value) || 1)}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            value={ligne.prix_unitaire}
                            onChange={(e) => updateLigne(index, "prix_unitaire", parseFloat(e.target.value) || 0)}
                            disabled // Prix basé sur l'article sélectionné
                          />
                        </TableCell>
                        <TableCell>
                          {calculateLigneTotal(ligne).toLocaleString("fr-FR", {
                            style: "currency",
                            currency: "EUR",
                          })}
                        </TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeLigne(index)}
                            disabled={formData.ligne_commandes.length <= 1}
                          >
                            <Trash size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-end border-t pt-4">
              <div className="space-y-2 w-64">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>
                    {calculateTotal().toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Message d'erreur */}
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-md">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#3FB076] hover:bg-green-700"
              >
                {loading ? "Enregistrement..." : "Enregistrer la commande"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default NewSale
