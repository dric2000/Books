export interface Product {
  id: number;
  reference: string;
  titre: string;
  auteur: string;
  description: string;
  prix: number;
  quantite: number;
  category: number;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface ProductCredentials {
  titre: string;
  reference: string;
  auteur: string;
  description: string;
  prix: number;
  quantite: number;
  categorie: number;
}

export interface ProductsState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

/* -------- Typage pour les utilisateurs ----------------*/

export interface User {
  id: number;
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  type_user?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthentificated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface TokenResponse {
  access: string;
  refresh: string;
}

export interface UsersState {
  data: User[];
  loading: boolean;
  error: string | null;
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
  };
}

/* -------- Typage pour les catégories ----------------*/

export interface Category {
  id: number;
  libelle: string;
  description: string;
  articles_count?: number;
}

export interface CategoriesState {
  items: Category[];
  isLoading: boolean;
  error: string | null;
}

export interface CategoryCredentials {
  libelle: string;
  description: string;
}

export interface CategoryItemProps {
  category: Category;
}

/* -------- Typage pour les ventes ----------------*/

export interface Client {
  id: number;
  email: string;
  nom: string;
  prenom: string;
  tel: string;
  password: string;
  type_user: "gerant" | "client" | string;
}

export interface LigneCommande {
  quantite: number;
  prix_unitaire: number;
  montant_total: number;
  article: number; // ou un objet Article si tu as le détail ailleurs
  commande: number; // identifiant de la commande associée
}

export interface Commande {
  id: number;
  num_commande: number;
  date_creation: string; // ou Date si tu convertis en objet Date côté frontend
  statut: "terminee" | "en_cours" | "annulee" | string; // selon ton API
  client: Client;
  gerant: number;
  client_non_complet: string;
  quantite_total: number;
  montant_total: number;
  ligne_commandes: LigneCommande[];
  detail_client: Client;
}

export interface SalesState {
  data: Commande[];
  loading: boolean;
  error: string | null;
}

export interface SalesFormData {
  client: Client | null;
  ligne_commandes: Array<{
    article: Product | null;
    quantite: number;
    prix_unitaire: number;
  }>;
}

export interface CreateCommandeData {
  client: number; // ID du client
  ligne_commandes: Array<{
    quantite: number;
    article: number; // ID de l'article
  }>;
}

export interface NewSaleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clients: Client[];
  products: Product[];
  onSuccess?: () => void;
}

/* -------- Typage pour les réponses de l'API ----------------*/

export interface BookItemProps {
  product: Product;
  id: number;
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
}

export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type CommandesResponse = Commande[];

export type PaginationParams = {
  page?: number;
  limit?: number;
};

export interface ApiError {
  details: string;
  success: boolean;
}
