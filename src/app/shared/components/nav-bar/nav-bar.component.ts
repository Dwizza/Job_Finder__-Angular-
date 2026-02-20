import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterLinkActive, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { clearFavorites } from '../../../store/favorites/favorites.actions';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isMenuOpen = false;
  isDropdownOpen = false;

  constructor(private router: Router, private store: Store) { }
  isLoggedIn(): boolean {
    return !!(localStorage.getItem('user'));
  }

  logout() {
    localStorage.removeItem('user');
    this.store.dispatch(clearFavorites());
    this.router.navigate(['/']);
    this.isDropdownOpen = false;
    this.isMenuOpen = false;
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }
}
