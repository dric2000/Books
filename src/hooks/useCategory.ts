import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "@/store/store.ts";
import {addCategory, deleteCategory, fetchCategories, updateCategory} from "@/slices/categoriesSlice.ts";
import type {Category, CategoryCredentials} from "@/types";
import toast from "react-hot-toast";

export const useCategory = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {items, isLoading, error} = useSelector((state: RootState) => state.categories);

    const getCategories = dispatch(fetchCategories());
    const createCategory = async (data: CategoryCredentials) => {
        const result = await dispatch(addCategory(data));
        if (addCategory.fulfilled.match(result)) toast.success("Catégorie ajoutée !")
        if (addCategory.rejected.match(result)) toast.error("Erreur d'ajout !")
    }
    const editCategory = async (id: number, data: Partial<Category>) => {
        const result = await dispatch(updateCategory({id, categoryData: data}));
        if (updateCategory.fulfilled.match(result)) toast.success("Catégorie modifiée !")
        if (updateCategory.rejected.match(result)) toast.error("Erreur de modification ! ")
    }
    const removeCategory = async (id: number) => {
        const result = await dispatch(deleteCategory(id));
        if (deleteCategory.fulfilled.match(result)) toast.success("Catégorie supprimée !")
        if (deleteCategory.rejected.match(result)) toast.error("Erreur de suppression !")
    }

    return {
        items,
        isLoading,
        error,
        getCategories,
        createCategory,
        editCategory,
        removeCategory,
    }
}