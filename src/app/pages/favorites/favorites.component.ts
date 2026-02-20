import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FavoriteOffer } from '../../core/models/favorite.model';
import { selectFavoriteItems, selectFavoritesLoading } from '../../store/favorites/favorites.selectors';
import { removeFavorite } from '../../store/favorites/favorites.actions';
import { RouterLink } from '@angular/router';
import { NavBarComponent } from "../../shared/components/nav-bar/nav-bar.component";

@Component({
    selector: 'app-favorites',
    standalone: true,
    imports: [CommonModule, RouterLink, NavBarComponent],
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

    private store = inject(Store)

    favorites$: Observable<FavoriteOffer[]> = this.store.select(selectFavoriteItems);
    loading$: Observable<boolean> = this.store.select(selectFavoritesLoading);

constructor() { }

ngOnInit() {
}

remove(id: string, offerId: string) {
    if (id) {
        this.store.dispatch(removeFavorite({ id, offerId }));
    }
}
}
