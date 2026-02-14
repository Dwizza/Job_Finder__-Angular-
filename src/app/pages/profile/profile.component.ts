import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from "../../shared/components/nav-bar/nav-bar.component";
import { User } from '../../core/models/user.model';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth-service/auth.service';

@Component({
  selector: 'app-profile',
  imports: [NavBarComponent, NgIf, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  isModalOpen = false;
  editData: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  openModal() {
    if (this.user) {
      this.editData = { ...this.user };
      this.isModalOpen = true;
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveProfile() {
    if (this.user) {
      this.authService.editProfile(this.editData).subscribe({
        next: (user) => {
          this.user = user;
          this.closeModal();
        },
        error: (err) => {
          console.error('Error updating profile', err);
        }
      });
    }
  }

}