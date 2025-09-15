import {
  createSale,
  deleteSale,
  fectchSales,
  updateSale,
} from "@/slices/salesSlice";
import type { RootState } from "@/store/store";
import type { Commande, CreateCommandeData, SalesFormData } from "@/types";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";

export const useSales = (autoFetch: boolean = true) => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(
    (state: RootState) => state.sales
  );

  useEffect(() => {
    if (autoFetch) {
      dispatch(fectchSales());
    }
  }, [dispatch, autoFetch]);

  // Création d'une nouvelle vente
  const create = async (commandeData: CreateCommandeData) => {
    const result = await dispatch(createSale(commandeData)).unwrap();
    return result;
  };

  // Fonction utilitaire pour transformer les données du formulaire
  const createFromFormData = async (formData: SalesFormData) => {
    if (!formData.client) {
      throw new Error("Client requis");
    }

    // Validation des lignes de commande
    const validLignes = formData.ligne_commandes.filter(
      (ligne) => ligne.article && ligne.quantite > 0
    );

    if (validLignes.length === 0) {
      throw new Error("Au moins une ligne de commande est requise");
    }

    const payload: CreateCommandeData = {
      client: formData.client.id,
      ligne_commandes: validLignes.map((ligne) => ({
        quantite: ligne.quantite,
        article: ligne.article!.id,
      })),
    };

    return await create(payload);
  };

  // Mettre à jour une vente

  const update = async (id: number, data: Partial<Commande>) => {
    const result = await dispatch(updateSale({ id, data })).unwrap();
    return result;
  };

  // Supprimer une vente

  const remove = async (id: number) => {
    await dispatch(deleteSale(id)).unwrap();
    return id;
  };

  // Fonction pour réinitialiser le state
  return {
    commandes: data,
    loading,
    error,
    create,
    createFromFormData,
    update,
    remove,
    refetch: () => dispatch(fectchSales()), // pour recharger manuellement
  };
};
