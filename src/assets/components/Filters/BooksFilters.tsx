import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger } from "@/components/ui/select"
import { SelectValue } from "@radix-ui/react-select"

const BooksFilters = () => {
  return (
    <div className="flex gap-5 items-center px-20">
      <Input placeholder="Titre" className="w-60 h-12 border-[#3FB076] " />
      <Input placeholder="Auteur" className="w-60 border-[#3FB076] h-12" />
      <Select>
        <SelectTrigger className="w-60 border-[#3FB076] !h-12">
          <SelectValue placeholder="Sélectionner une catégorie"></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Aventures</SelectLabel>
            <SelectLabel>Actions</SelectLabel>
            <SelectLabel>Romances</SelectLabel>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div >
  )
}

export default BooksFilters
