
import BookItem from "../components/BookItem/BookItem"
import BooksFilters from "../components/Filters/BooksFilters"

import Navbar from "../components/Header/Navbar"

const BooksList = () => {
  return (
    <div>
      <Navbar />
      <BooksFilters />
      <div className="flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 p-20">
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
        </div>
      </div>
    </div>
  )
}

export default BooksList
