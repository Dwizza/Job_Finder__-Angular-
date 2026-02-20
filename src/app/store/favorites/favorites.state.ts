import { FavoriteOffer } from "../../core/models/favorite.model";

export interface FavoritesState {
    favorites: FavoriteOffer[];
    loading: boolean;
    error: string | null;
}

export const initialFavoritesState: FavoritesState = {
    favorites: [],
    loading: false,
    error: null
}   