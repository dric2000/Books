import BookItem from "../components/BookItem/BookItem"
import BooksFilters from "../components/Filters/BooksFilters"

import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { fetchProducts } from "@/slices/productsSlice"
import type { Product } from "@/types"
import { useEffect, useState } from "react"
import Navbar from "../components/Header/Navbar"

const BooksList = () => {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.products);



  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Recherche 

  const [searchTerm, setSearchTerm] = useState('');
  const filteredItems = items.filter(product =>
    product.titre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.auteur?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  // Réinitialiser la page à 1 quand les items changent (ex: après filtrage)
  useEffect(() => {
    setCurrentPage(1);
  }, [items.length]);

  if (status === 'loading') {
    return <div>Chargement...</div>;
  }

  if (status === 'failed') {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <BooksFilters searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="flex flex-col">
        {/* Informations de pagination */}
        <div className="px-20 py-4 text-sm text-gray-600">
          Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, items.length)} sur {items.length} produits
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 p-20">
          {
            paginatedProducts.map((product: Product) => (
              <div key={product.id}>
                <BookItem product={product} id={product.id} />
              </div>
            ))
          }
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center bg-white px-6 py-4 border rounded-lg shadow-sm mx-20 mb-8">
          <div className="flex space-x-2 text-sm text-gray-700">
            Page {currentPage} sur {totalPages} ({filteredItems.length} résultat{filteredItems.length > 1 ? "s" : ""})
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Précédent
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = totalPages <= 5
                ? i + 1
                : currentPage <= 3
                  ? i + 1
                  : currentPage >= totalPages - 2
                    ? totalPages - 4 + i
                    : currentPage - 2 + i;
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  className="w-8 h-8 p-0"
                >
                  {pageNum}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Suivant
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BooksList