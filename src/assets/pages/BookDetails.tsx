import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Navbar from "../components/Header/Navbar"

const BookDetails = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-row w-full items-center p-20">

        <img src="/cover.png" alt="" className="h-150 w-200 object-cover" />

        <Separator orientation="vertical" />

        <div className="flex flex-col gap-10">
          <h1 className="text-4xl font-bold">Virées Nocturenes</h1>
          <Badge variant={"outline"}>Aventures</Badge>
          <Badge className="h-5 min-w-5 rounded-full px-1 bg-[#3FB076]">
            87 unités en stock
          </Badge>
          <div>
            <h2 className="text-2xl font-semibold">Résumé</h2>
            <p className="text-xl">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. <br />
              Perferendis similique neque omnis quasi, quod, perspiciatis quis <br /> aliquam debitis veritatis,
              officiis alias. Similique doloribus libero, <br /> architecto quia rerum veritatis accusamus magni! <br />
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. <br />
              Perferendis similique neque omnis quasi, quod, perspiciatis quis <br /> aliquam debitis veritatis,
              officiis alias. Similique doloribus libero, <br /> architecto quia rerum veritatis accusamus magni!
            </p>
          </div>
          <Button className="bg-[#3FB076] w-fit hover:bg-green-800">Faire une réservation</Button>
        </div>
      </div>
    </div>
  )
}

export default BookDetails
