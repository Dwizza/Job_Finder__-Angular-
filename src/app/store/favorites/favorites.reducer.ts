// favorites.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as FavoritesActions from './favorites.actions';
import { initialFavoritesState } from './favorites.state';

export const favoritesReducer = createReducer(
    initialFavoritesState,

    on(FavoritesActions.loadFavorites, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(FavoritesActions.loadFavoritesSuccess, (state, { favorites }) => ({
        ...state,
        favorites,
        loading: false
    })),

    on(FavoritesActions.loadFavoritesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(FavoritesActions.addFavoriteSuccess, (state, { favorite }) => ({
        ...state,
        favorites: [...state.favorites, favorite]
    })),

    on(FavoritesActions.removeFavoriteSuccess, (state, { id }) => ({
        ...state,
        favorites: state.favorites.filter(f => f.id !== id)
    })),

    on(FavoritesActions.clearFavorites, () => initialFavoritesState)
);
