import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service/auth.service';
import { Store } from '@ngrx/store';
import { loadFavorites } from '../../../store/favorites/favorites.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMsg = '';
  loading = false;

  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private store = inject(Store);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    this.errorMsg = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;

    const payload = {
      email: this.form.value.email!,
      password: this.form.value.password!
    }
    this.authService.login(payload).subscribe({
      next: (response: any) => { // Assuming response might contain user or we check localStorage
        this.loading = false;
        // Check localStorage to be sure, or use response if it returns the user object
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          this.store.dispatch(loadFavorites({ userId: user.id }));
        }
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        console.log("error");

        this.loading = false;
        this.errorMsg = (err?.message === 'Invalid email or password') ? 'Invalid email or password' : 'An error occurred, please try again';
      }
    })
  }
}
