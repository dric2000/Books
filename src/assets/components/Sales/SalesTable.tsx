import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchProducts } from "@/slices/productsSlice";
import { fectchSales } from "@/slices/salesSlice";
import { fetchUsers } from "@/slices/usersSlice";
import { Pencil, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import NewSale from "./NewSale";


const SalesTable = () => {

  const dispatch = useAppDispatch();

  const { data: commandes, loading, error } = useAppSelector((state) => state.sales);
  const { data: users } = useAppSelector((state) => state.users);
  const { items: products } = useAppSelector((state) => state.products);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const clients = users
    .filter(user => user.type_user === "client")
    .map((user, index) => ({
      ...user,
      id: index + 1 // ID temporaire basé sur l'index
      // Ou si tu as un autre champ unique : id: user.email.hashCode() ou similar
    }));

  // Effet pour charger les données au montage du composant
  useEffect(() => {
    dispatch(fectchSales());
    dispatch(fetchUsers({ page: 1, limit: 100 })); // Charger 100 utilisateurs
    dispatch(fetchProducts()); // Charger 100 articles
    dispatch(fectchSales());
  }, [dispatch]);


  // Fonction pour rafraîchir les données après une création
  const handleRefreshAfterCreate = () => {
    dispatch(fectchSales());
  };


  // On "aplatit" toutes les lignes de commande
  const lignes = commandes.flatMap((commande) =>
    (commande.ligne_commandes || []).map((ligne) => ({
      ...ligne,
      client: commande.client, // on ajoute le client pour chaque ligne
    }))
  );

  // Total général basé sur toutes les lignes
  const totalVentes = lignes.reduce(
    (sum, ligne) => sum + (ligne.montant_total ?? 0),
    0
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Total des ventes</h2>
          <p className="text-sm text-gray-600 mt-1">
            {totalVentes.toLocaleString("fr-FR", {
              style: "currency",
              currency: "EUR",
            })}
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#3FB076] hover:bg-green-700 flex items-center gap-2"
        >
          <Plus size={16} /> Nouvelle vente
        </Button>
      </div>

      <div>
        <Table>
          <TableCaption>Liste des ventes (détail par article)</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Produit</TableHead>
              <TableHead>Quantité</TableHead>
              <TableHead>Prix unitaire</TableHead>
              <TableHead>Montant total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  Chargement...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-red-500">
                  {error}
                </TableCell>
              </TableRow>
            ) : lignes.length > 0 ? (
              lignes.map((ligne, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {ligne.client.nom} {ligne.client.prenom}
                  </TableCell>
                  <TableCell>
                    {/* Si tu as le nom du produit dans ligne.article, affiche-le */}
                    {typeof ligne.article === "object"
                      ? ligne.article.nom
                      : `Article #${ligne.article}`}
                  </TableCell>
                  <TableCell>{ligne.quantite}</TableCell>
                  <TableCell>
                    {ligne.prix_unitaire.toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </TableCell>
                  <TableCell>
                    {ligne.montant_total.toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm">
                      <Pencil size={14} /> {/* Éditer */}
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash size={14} /> {/* Supprimer */}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  Aucune vente disponible.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="font-bold">
                {totalVentes.toLocaleString("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                })}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <NewSale
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        clients={clients}
        products={products}
        onSuccess={handleRefreshAfterCreate}
      />

    </div>
  );
};

export default SalesTable;
