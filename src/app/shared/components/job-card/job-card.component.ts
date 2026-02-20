import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Job } from '../../../core/models/job.model';
import { selectIsFavorited, selectFavoriteItems } from '../../../store/favorites/favorites.selectors';
import { addFavorite, removeFavorite } from '../../../store/favorites/favorites.actions';
import { FavoriteOffer } from '../../../core/models/favorite.model';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css'
})
export class JobCardComponent implements OnInit {
  @Input() job!: Job;
  @Output() apply = new EventEmitter<Job>();

  isFavorited$!: Observable<boolean>;
  currentUser = JSON.parse(localStorage.getItem('user') || 'null');

  constructor(private store: Store) { }

  ngOnInit() {
    if (this.job && this.job.id && this.currentUser) {
      this.isFavorited$ = this.store.select(selectIsFavorited(String(this.job.id), this.currentUser.id));
    } else {
      // If no user, it's definitely not favorited
      this.isFavorited$ = new Observable(sub => sub.next(false));
    }
  }

  onApplyClick() {
    this.apply.emit(this.job);
  }

  toggleFavorite() {
    if (!this.currentUser) return;

    // Use a one-time subscription to get current state and decide action
    const sub = this.store.select(selectFavoriteItems).subscribe(favorites => {
      const fav = favorites.find(f => f.offerId === String(this.job.id));
      if (fav && fav.id) {
        this.store.dispatch(removeFavorite({ id: fav.id, offerId: String(this.job.id) }));
      } else {
        const newFav: FavoriteOffer = {
          userId: this.currentUser.id,
          offerId: String(this.job.id),
          title: this.job.title,
          company: this.job.company.display_name,
          location: this.job.location.display_name
        };
        this.store.dispatch(addFavorite({ favorite: newFav }));
      }
    });
    sub.unsubscribe();
  }
}
