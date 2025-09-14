import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router";
import type { BookItemProps } from '../../../types/index';

const BookItem = ({ id, product }: BookItemProps) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/details-livre/${id}`);
  };
  return (
    <div>
      <Card className="w-70 border-[#3FB076] hover:border-3 transition-all duration-300 group">
        <div className="flex flex-row items-center justify-between px-5">
          <Badge className="h-5 min-w-5 rounded-full px-1 bg-[#3FB076]">
            87
          </Badge>
          <Badge variant="outline">{product.reference}</Badge>
        </div>
        <CardContent className="p-2">
          <img src="/cover.png" alt="" className="rounded-md transform transition-transform duration-300 group-hover:scale-110" onClick={handleClick} />
        </CardContent>

        <Separator className="my-4" />

        <CardFooter className="flex flex-col p-2">
          <h1> {product.prix} XOF </h1>
          <CardTitle className="text-base text-center"> {product.titre} </CardTitle>
          <CardDescription className="text-sm"> {product.auteur} </CardDescription>
        </CardFooter>
      </Card>
    </div>
  )
}

export default BookItem
