import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { JobComponent } from './pages/jobs/job/job.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuardGuard } from './core/guards/auth-guard.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { ApplicationsComponent } from './pages/application/application.component';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'jobs', component: JobComponent, pathMatch: 'full', canActivate: [authGuardGuard] },
    { path: 'profile', component: ProfileComponent, pathMatch: 'full', canActivate: [authGuardGuard] },
    { path: 'applications', component: ApplicationsComponent, pathMatch: 'full', canActivate: [authGuardGuard] },
    { path: 'favorites', loadComponent: () => import('./pages/favorites/favorites.component').then(m => m.FavoritesComponent), canActivate: [authGuardGuard] }
];
