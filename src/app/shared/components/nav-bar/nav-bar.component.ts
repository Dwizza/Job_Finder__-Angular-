import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLinkActive, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLinkActive, RouterLink, NgIf],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isMenuOpen = false;
  isDropdownOpen = false;

  constructor(private router: Router) { }
  isLoggedIn(): boolean {
    return !!(localStorage.getItem('user'));
  }

  logout() {
    localStorage.removeItem('user');
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
