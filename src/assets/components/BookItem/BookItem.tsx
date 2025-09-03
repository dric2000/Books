import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const BookItem = () => {
  return (
    <div>
      <Card className="w-70 border-[#3FB076] hover:border-3 transition-all duration-300 group">
        <div className="flex flex-row items-center justify-between px-5">
          <Badge className="h-5 min-w-5 rounded-full px-1 bg-[#3FB076]">
            87
          </Badge>
          <Badge variant="outline">Aventures</Badge>
        </div>
        <CardContent className="p-2">
          <img src="/cover.png" alt="" className="rounded-md transform transition-transform duration-300 group-hover:scale-110" />
        </CardContent>

        <Separator className="my-4" />

        <CardFooter className="flex flex-col p-2">
          <h1>15 500 F</h1>
          <CardTitle className="text-base">Virées Nocturnes</CardTitle>
          <CardDescription className="text-sm">Cédric BLEOSSI</CardDescription>
        </CardFooter>
      </Card>
    </div>
  )
}

export default BookItem
