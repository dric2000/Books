import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface BooksFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const BooksFilters: React.FC<BooksFiltersProps> = ({
  searchTerm,
  onSearchChange
}) => {
  const clearSearch = () => {
    onSearchChange('');
  };
  return (
    <div className="flex gap-5 items-center px-20">
      <Input
        placeholder="Rechercher par nom, auteur..."
        className="w-100 h-12 border-[#3FB076] focus:border-[#2A8B5A] focus:ring-[#3FB076] focus:ring-1"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {/*<Input placeholder="Auteur" className="w-60 border-[#3FB076] h-12" />*/}

      {searchTerm && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600"
        >
          <X className="h-4 w-4 text-gray-400" />
        </button>
      )}
      {/*<Select>
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
      </Select>*/}
    </div >
  )
}

export default BooksFilters
