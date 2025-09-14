import BookItem from "../components/BookItem/BookItem"
import BooksFilters from "../components/Filters/BooksFilters"

import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { fetchProducts } from "@/slices/productsSlice"
import type { Product } from "@/types"
import { useEffect } from "react"
import Navbar from "../components/Header/Navbar"

const BooksList = () => {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Chargement...</div>;
  }

  if (status === 'failed') {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <BooksFilters />
      <div className="flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 p-20">
          {
            items.map((product: Product) => (
              <div key={product.id}>
                <BookItem product={product} id={product.id} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default BooksList
