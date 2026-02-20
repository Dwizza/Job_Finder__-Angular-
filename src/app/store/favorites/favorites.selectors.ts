import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritesState } from './favorites.state';

export const selectFavoritesState =
  createFeatureSelector<FavoritesState>('favorites');

export const selectFavoriteItems =
  createSelector(selectFavoritesState, (state) => state.favorites);

export const selectFavoritesLoading =
  createSelector(selectFavoritesState, (state) => state.loading);

export const selectIsFavorited = (offerId: string, userId: string) =>
  createSelector(selectFavoriteItems, (items) =>
    items.some(x => x.offerId === offerId && x.userId === userId)
  );
