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
import { ChevronDown, ChevronRight, Pencil, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import NewSale from "./NewSale";

const SalesTable = () => {
  const dispatch = useAppDispatch();

  const { data: commandes, loading, error } = useAppSelector((state) => state.sales);
  const { data: users } = useAppSelector((state) => state.users);
  const { items: products } = useAppSelector((state) => state.products);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedCommandes, setExpandedCommandes] = useState<number[]>([]);

  const clients = users
    .filter(user => user.type_user === "client")
    .map((user, index) => ({
      ...user,
      id: index + 1
    }));

  // Effet pour charger les données au montage du composant
  useEffect(() => {
    dispatch(fectchSales());
    dispatch(fetchUsers({ page: 1, limit: 100 }));
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleRefreshAfterCreate = async () => {
    await dispatch(fectchSales()).unwrap();
  };

  // Fonction pour basculer l'affichage des détails d'une commande
  const toggleCommandeDetails = (commandeId: number) => {
    if (expandedCommandes.includes(commandeId)) {
      setExpandedCommandes(expandedCommandes.filter(id => id !== commandeId));
    } else {
      setExpandedCommandes([...expandedCommandes, commandeId]);
    }
  };

  // Total général basé sur toutes les commandes
  const totalVentes = commandes.reduce(
    (sum, commande) => sum + (commande.montant_total ?? 0),
    0
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen dark:bg-gray-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 ">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-200">Total des ventes</h2>
          <p className="text-sm text-gray-600 mt-1 dark:text-gray-400">
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
          <TableCaption>Liste des ventes</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Numéro de commande</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Nombre d'articles</TableHead>
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
            ) : commandes.length > 0 ? (
              commandes.map((commande) => (
                <>
                  <TableRow key={commande.id}>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleCommandeDetails(commande.id)}
                      >
                        {expandedCommandes.includes(commande.id) ? (
                          <ChevronDown size={20} />
                        ) : (
                          <ChevronRight size={20} />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">
                      Commande {commande.id}
                    </TableCell>
                    <TableCell>
                      {commande.detail_client.prenom} {commande.detail_client.nom}
                    </TableCell>
                    <TableCell>
                      {commande.ligne_commandes?.length || 0} article(s)
                    </TableCell>
                    <TableCell>
                      {commande.montant_total.toLocaleString("fr-FR", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm">
                        <Pencil size={14} />
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash size={14} />
                      </Button>
                    </TableCell>
                  </TableRow>
                  {expandedCommandes.includes(commande.id) && commande.ligne_commandes && (
                    <TableRow>
                      <TableCell colSpan={6} className="bg-gray-50 p-4">
                        <div className="ml-6">
                          <h4 className="font-medium mb-2">Détails de la commande</h4>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Produit</TableHead>
                                <TableHead>Quantité</TableHead>
                                <TableHead>Prix unitaire</TableHead>
                                <TableHead>Total</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {commande.ligne_commandes.map((ligne, index) => (
                                <TableRow key={index}>
                                  <TableCell>
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
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
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
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="font-bold">
                {commandes.reduce((sum, cmd) => sum + (cmd.ligne_commandes?.length || 0), 0)} article(s)
              </TableCell>
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