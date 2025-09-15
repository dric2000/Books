import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Navbar from "../components/Header/Navbar"
import { useParams } from "react-router"
import { useAppSelector } from "@/hooks/redux"

const BookDetails = () => {
  const { id } = useParams();
  const { items: products } = useAppSelector((state) => state.products);
  const product = products.find((prdt) => prdt.id === Number(id));

  return (
    <div>
      <Navbar />
      <div className="flex flex-row w-full items-center p-20">

        <img src="/cover.png" alt="" className="h-150 w-200 object-cover" />

        <Separator orientation="vertical" />

        <div className="flex flex-col gap-10">
          <h1 className="text-4xl font-bold">{product?.titre}</h1>
          <Badge variant={"outline"}> {product?.reference} </Badge>
          <Badge className="h-5 min-w-5 rounded-full px-1 bg-[#3FB076]">
            {product?.quantite} unités en stock
          </Badge>
          <div>
            <h2 className="text-2xl font-semibold">Résumé</h2>
            <p className="text-xl">
              {product?.description}
            </p>
          </div>
          <Button className="bg-[#3FB076] w-fit hover:bg-green-800">Faire une réservation</Button>
        </div>
      </div>
    </div>
  )
}

export default BookDetails
