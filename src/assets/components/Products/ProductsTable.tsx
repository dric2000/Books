import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addProduct, deleteProduct, fetchProducts, updateProduct } from "@/slices/productsSlice";
import type { Product } from "@/types";
import { ChevronDown, ChevronUp, ChevronsUpDown, Loader2, MoreHorizontal, Search, Trash, Plus, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Dialog, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogContent, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { fetchCategories } from "@/slices/categoriesSlice";

const formatPrice = (price: number) =>
    new Intl.NumberFormat("fr-FR", { style: "currency", currency: "XOF" }).format(price);

const getStockStatus = (stock: number) => {
    if (stock <= 10) return { color: "text-red-600 bg-red-50", label: "Stock faible" };
    if (stock <= 50) return { color: "text-orange-600 bg-orange-50", label: "Stock moyen" };
    return { color: "text-green-600 bg-green-50", label: "Stock bon" };
};

const ProductsTable: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items: products, status, error } = useAppSelector((state) => state.products);
    const { items: categories } = useAppSelector((state) => state.categories);

    const [sortField, setSortField] = useState<keyof Product | "total" | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 50;

    // États pour les dialogues
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // États pour formulaires
    const initialFormData = { titre: "", auteur: "", description: "", reference: "", prix: 0, quantite: 0, categorie: 0 };
    const [addFormData, setAddFormData] = useState(initialFormData);
    const [editFormData, setEditFormData] = useState(initialFormData);

    // Reset formulaire
    const resetAddForm = () => setAddFormData(initialFormData);
    const resetEditForm = () => {
        setEditFormData(initialFormData);
        setSelectedProduct(null);
    };

    // Input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, type: "add" | "edit") => {
        const { name, value } = e.target;
        const setter = type === "add" ? setAddFormData : setEditFormData;
        setter((prev) => ({ ...prev, [name]: ["prix", "quantite", "categorie"].includes(name) ? Number(value) : value }));
    };

    // Ouvrir dialogues
    const handleAddOpen = () => {
        resetAddForm();
        setAddOpen(true);
    };
    const handleEditOpen = (product: Product) => {
        setSelectedProduct(product);
        setEditFormData({
            titre: product.titre,
            auteur: product.auteur,
            description: product.description,
            reference: product.reference,
            prix: product.prix,
            quantite: product.quantite,
            categorie: product.category,
        });
        setEditOpen(true);
    };

    // Fermer dialogues
    const handleAddClose = () => {
        setAddOpen(false);
        resetAddForm();
    };
    const handleEditClose = () => {
        setEditOpen(false);
        resetEditForm();
    };

    // Ajout
    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!addFormData.titre.trim()) return alert("Le nom de produit est requis !");
        setIsSubmitting(true);
        try {
            await dispatch(addProduct(addFormData)).unwrap();
            toast.success("Produit ajouté !");
            handleAddClose();
            dispatch(fetchProducts());
        } catch (err) {
            console.error(err);
            toast.error("Erreur lors de l'ajout du produit");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Modification
    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProduct) return;
        setIsSubmitting(true);
        try {
            await dispatch(updateProduct({ id: selectedProduct.id, productData: editFormData })).unwrap();
            toast.success("Produit mis à jour !");
            handleEditClose();
            dispatch(fetchProducts());
        } catch (err) {
            console.error(err);
            toast.error("Erreur lors de la mise à jour du produit");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Suppression
    const handleDelete = async (productId: number, productTitle: string) => {
        if (!confirm(`Êtes-vous sûr de vouloir supprimer "${productTitle}" ?`)) return;
        try {
            await dispatch(deleteProduct(productId)).unwrap();
            toast.success("Produit supprimé");
            dispatch(fetchProducts());
        } catch (err) {
            toast.error(`Erreur lors de la suppression : ${err}`);
        }
    };

    // Tri
    const handleSort = (field: keyof Product | "total") => {
        if (sortField === field) setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        else {
            setSortField(field);
            setSortDirection("asc");
        }
    };
    const getSortIcon = (field: keyof Product | "total") =>
        sortField !== field ? <ChevronsUpDown className="ml-2 h-4 w-4" /> : sortDirection === "asc" ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />;

    // Fetch data
    useEffect(() => { if (status === "idle") dispatch(fetchProducts()); }, [status, dispatch]);
    useEffect(() => { dispatch(fetchCategories()); }, [dispatch]);

    // Filtrage, tri et pagination
    const filteredProducts = products.filter((p) =>
        p.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.auteur.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (!sortField) return 0;
        if (sortField === "total") return sortDirection === "asc" ? a.prix * a.quantite - b.prix * b.quantite : b.prix * b.quantite - a.prix * a.quantite;
        if (["titre", "auteur", "reference"].includes(sortField)) return sortDirection === "asc" ? a[sortField].localeCompare(b[sortField]) : b[sortField].localeCompare(a[sortField]);
        return sortDirection === "asc" ? (a[sortField] as number) - (b[sortField] as number) : (b[sortField] as number) - (a[sortField] as number);
    });
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);
    const totalValue = products.reduce((sum, p) => sum + p.prix * p.quantite, 0);

    if (status === "loading") return <div className="flex items-center justify-center min-h-screen"><Loader2 className="animate-spin h-6 w-6 mr-2" />Chargement...</div>;
    if (status === "failed") return <div className="text-red-600 text-center mt-10">{error}</div>;

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen dark:bg-gray-800">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 ">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Gestion des Produits</h2>
                    <p className="text-sm text-gray-600 mt-1 dark:text-gray-500">{products.length} produits • Valeur totale : {formatPrice(totalValue)}</p>
                </div>
                {/* Add Dialog */}
                <Dialog open={addOpen} onOpenChange={setAddOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={handleAddOpen} className="bg-[#3FB076] hover:bg-green-800"><Plus /> Nouveau produit</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <form onSubmit={handleAddSubmit}>
                            <DialogHeader>
                                <DialogTitle>Ajouter un nouveau produit</DialogTitle>
                                <DialogDescription>Renseignez ici les informations du nouveau produit.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4">
                                {["titre", "reference", "auteur", "description"].map((field) => (
                                    <div key={field} className="grid gap-3">
                                        <Label htmlFor={field}>{field === "titre" ? "Nom du produit" : field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                                        <Input id={field} name={field} value={addFormData[field as keyof typeof addFormData]} onChange={(e) => handleInputChange(e, "add")} />
                                    </div>
                                ))}
                                <div className="grid gap-3">
                                    <Label htmlFor="prix">Prix</Label>
                                    <Input type="number" id="prix" name="prix" value={addFormData.prix} onChange={(e) => handleInputChange(e, "add")} />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="quantite">Quantité</Label>
                                    <Input type="number" id="quantite" name="quantite" value={addFormData.quantite} onChange={(e) => handleInputChange(e, "add")} />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="categorie">Catégorie</Label>
                                    <select name="categorie" value={addFormData.categorie} onChange={(e) => handleInputChange(e, "add")} className="border border-gray-300 rounded-md p-2" required>
                                        <option value="">-- Sélectionner une catégorie --</option>
                                        {categories.map((c) => <option key={c.id} value={c.id}>{c.libelle}</option>)}
                                    </select>
                                </div>
                            </div>
                            <DialogFooter className="mt-5">
                                <DialogClose asChild><Button variant="outline">Annuler</Button></DialogClose>
                                <Button type="submit">Ajouter</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Search */}
            <div className="flex max-w-sm items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input type="text" placeholder="Rechercher un produit..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3FB076] outline-none" />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border shadow-sm overflow-x-auto dark:bg-gray-700">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        {["titre", "quantite", "prix", "total"].map((field) => (
                            <th key={field} className="px-6 py-3 text-left">
                                <Button variant="ghost" onClick={() => handleSort(field as keyof Product | "total")} className="h-auto p-0 text-2xl font-semibold justify-start hover:bg-gray-100">
                                    {field === "titre" ? "Nom du produit" : field === "quantite" ? "Stock" : field === "prix" ? "Prix unitaire" : "Valeur totale"}
                                    {getSortIcon(field as keyof Product | "total")}
                                </Button>
                            </th>
                        ))}
                        <th className="px-6 py-3 text-center text-2xl font-semibold">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {paginatedProducts.length > 0 ? paginatedProducts.map((product) => {
                        const stockStatus = getStockStatus(product.quantite);
                        const total = product.prix * product.quantite;
                        return (
                            <tr key={product.id} className="hover:bg-gray-50 hover:dark:bg-gray-600">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900 text-xl">{product.titre}</div>
                                    <div className="text-xs text-gray-500 dark:text-white">ID: {product.id}</div>
                                </td>
                                <td className="px-6 py-4 text-right"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xl font-medium ${stockStatus.color}`}>{product.quantite} unités</span></td>
                                <td className="px-6 py-4 text-right text-xl font-medium text-gray-900">{formatPrice(product.prix)}</td>
                                <td className="px-6 py-4 text-right text-xl font-semibold text-blue-600">{formatPrice(total)}</td>
                                <td className="px-6 py-4 text-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100"><span className="sr-only">Ouvrir le menu</span><MoreHorizontal className="h-4 w-4" /></Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48">
                                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(product.reference)}>📋 Copier la référence</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleEditOpen(product)}><Pencil className="mr-2 h-4 w-4" /> Modifier</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleDelete(product.id, product.titre)} className="text-red-600"><Trash className="mr-2 h-4 w-4" /> Supprimer</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        );
                    }) : <tr><td colSpan={5} className="text-center py-12 text-gray-500">Aucun produit trouvé</td></tr>}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-between items-center bg-white px-6 py-4 border rounded-lg shadow-sm dark:bg-gray-700">
                    <div className="flex space-x-2 text-sm text-gray-700 dark:text-white">Page {currentPage} sur {totalPages} ({sortedProducts.length} résultat{sortedProducts.length > 1 ? "s" : ""})</div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>Précédent</Button>
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum = totalPages <= 5 ? i + 1 : currentPage <= 3 ? i + 1 : currentPage >= totalPages - 2 ? totalPages - 4 + i : currentPage - 2 + i;
                            return <Button key={pageNum} variant={currentPage === pageNum ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(pageNum)} className="w-8 h-8 p-0">{pageNum}</Button>;
                        })}
                        <Button variant="outline" size="sm" onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>Suivant</Button>
                    </div>
                </div>
            )}

            {/* Edit Dialog */}
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleEditSubmit}>
                        <DialogHeader>
                            <DialogTitle>Modifier le produit</DialogTitle>
                            <DialogDescription>Mettez à jour les informations du produit.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            {["titre", "reference", "auteur", "description"].map((field) => (
                                <div key={field} className="grid gap-3">
                                    <Label htmlFor={field}>{field === "titre" ? "Nom du produit" : field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                                    <Input id={field} name={field} value={editFormData[field as keyof typeof editFormData]} onChange={(e) => handleInputChange(e, "edit")} />
                                </div>
                            ))}
                            <div className="grid gap-3">
                                <Label htmlFor="prix">Prix</Label>
                                <Input type="number" id="prix" name="prix" value={editFormData.prix} onChange={(e) => handleInputChange(e, "edit")} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="quantite">Quantité</Label>
                                <Input type="number" id="quantite" name="quantite" value={editFormData.quantite} onChange={(e) => handleInputChange(e, "edit")} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="categorie">Catégorie</Label>
                                <select name="categorie" value={editFormData.categorie} onChange={(e) => handleInputChange(e, "edit")} className="border border-gray-300 rounded-md p-2" required>
                                    <option value="">-- Sélectionner une catégorie --</option>
                                    {categories.map((c) => <option key={c.id} value={c.id}>{c.libelle}</option>)}
                                </select>
                            </div>
                        </div>
                        <DialogFooter className="mt-5">
                            <DialogClose asChild><Button variant="outline">Annuler</Button></DialogClose>
                            <Button type="submit">Enregistrer</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ProductsTable;
