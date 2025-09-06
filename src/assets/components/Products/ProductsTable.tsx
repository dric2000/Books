import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, ChevronUp, ChevronsUpDown, Edit, MoreHorizontal, Search, Trash } from "lucide-react"
import { useState } from "react"

export interface Product {
  id: string
  name: string
  stock: number
  unitPrice: number
}

const sampleProducts: Product[] = [
  { id: "p-001", name: "Câble USB-C 1m", stock: 120, unitPrice: 6.5 },
  { id: "p-002", name: "Chargeur 65W", stock: 34, unitPrice: 29.99 },
  { id: "p-003", name: "Clé USB 32GB", stock: 210, unitPrice: 9.9 },
  { id: "p-004", name: "Souris sans fil", stock: 52, unitPrice: 18.0 },
  { id: "p-005", name: "Tapis de souris", stock: 150, unitPrice: 4.5 },
  { id: "p-006", name: "Casque Bluetooth", stock: 18, unitPrice: 49.99 },
  { id: "p-007", name: "Support laptop", stock: 7, unitPrice: 22.0 },
  { id: "p-008", name: "HDMI 2.1 2m", stock: 78, unitPrice: 12.75 },
]

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

const getStockStatus = (stock: number) => {
  if (stock <= 10) return { color: 'text-red-600 bg-red-50', label: 'Stock faible' }
  if (stock <= 50) return { color: 'text-orange-600 bg-orange-50', label: 'Stock moyen' }
  return { color: 'text-green-600 bg-green-50', label: 'Stock bon' }
}

interface ProductsTableProps {
  initialData?: Product[]
}

const ProductsTable: React.FC<ProductsTableProps> = ({ initialData }) => {
  const [products] = useState<Product[]>(initialData ?? sampleProducts)
  const [sortField, setSortField] = useState<keyof Product | 'total' | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const handleSort = (field: keyof Product | 'total') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getSortIcon = (field: keyof Product | 'total') => {
    if (sortField !== field) return <ChevronsUpDown className="ml-2 h-4 w-4" />
    return sortDirection === 'asc' ?
      <ChevronUp className="ml-2 h-4 w-4" /> :
      <ChevronDown className="ml-2 h-4 w-4" />
  }

  // Filtrage et tri
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortField) return 0

    if (sortField === 'total') {
      const aValue = a.stock * a.unitPrice
      const bValue = b.stock * b.unitPrice
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
    }

    if (sortField === 'name' || sortField === 'id') {
      const aValue = a[sortField]
      const bValue = b[sortField]
      return sortDirection === 'asc' ?
        aValue.localeCompare(bValue) :
        bValue.localeCompare(aValue)
    }

    const aValue = a[sortField] as number
    const bValue = b[sortField] as number
    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
  })

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage)

  const totalValue = products.reduce((sum, product) => sum + (product.stock * product.unitPrice), 0)

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* En-tête */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Gestion des Produits</h2>
          <p className="text-sm text-gray-600 mt-1">
            {products.length} produits • Valeur totale : {formatPrice(totalValue)}
          </p>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="flex items-center space-x-2 max-w-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3FB076] focus:border-[#3FB076] outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('name')}
                    className="h-auto p-0 text-2xl text-center font-semibold justify-start hover:bg-gray-100"
                  >
                    Nom du produit
                    {getSortIcon('name')}
                  </Button>
                </th>
                <th className="px-6 py-3 text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('stock')}
                    className="h-auto p-0 text-2xl text-center font-semibold justify-start hover:bg-gray-100"
                  >
                    Stock
                    {getSortIcon('stock')}
                  </Button>
                </th>
                <th className="px-6 py-3 text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('unitPrice')}
                    className="h-auto p-0 text-2xl text-center font-semibold justify-end hover:bg-gray-100"
                  >
                    Prix unitaire
                    {getSortIcon('unitPrice')}
                  </Button>
                </th>
                <th className="px-6 py-3 text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('total')}
                    className="h-auto p-0 text-2xl text-center font-semibold justify-end hover:bg-gray-100"
                  >
                    Valeur totale
                    {getSortIcon('total')}
                  </Button>
                </th>
                <th className="px-6 py-3 text-center">
                  <span className="text-2xl text-center font-semibold text-gray-900">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stock)
                  const total = product.stock * product.unitPrice

                  return (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900 text-xl">
                          {product.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {product.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xl font-medium ${stockStatus.color}`}>
                          {product.stock} unités
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-xl font-medium text-gray-900">
                        {formatPrice(product.unitPrice)}
                      </td>
                      <td className="px-6 py-4 text-right text-xl font-semibold text-blue-600">
                        {formatPrice(total)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                              <span className="sr-only">Ouvrir le menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem
                              onClick={() => navigator.clipboard.writeText(product.id)}
                              className="cursor-pointer"
                            >
                              📋 Copier l'ID
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => alert(`Modifier ${product.name}`)}
                              className="cursor-pointer"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                if (confirm(`Êtes-vous sûr de vouloir supprimer "${product.name}" ?`)) {
                                  alert(`Suppression de ${product.name}`)
                                }
                              }}
                              className="cursor-pointer text-red-600 focus:text-red-600"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center space-y-3">
                      <Search className="h-12 w-12 text-gray-300" />
                      <span className="text-lg font-medium">Aucun produit trouvé</span>
                      <span className="text-sm">Essayez de modifier votre recherche</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white px-6 py-4 border rounded-lg shadow-sm">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">
              Page {currentPage} sur {totalPages}
            </span>
            <span className="text-sm text-gray-500">
              ({sortedProducts.length} résultat{sortedProducts.length > 1 ? 's' : ''})
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="hover:bg-gray-50"
            >
              Précédent
            </Button>
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }

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
                )
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="hover:bg-gray-50"
            >
              Suivant
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductsTable