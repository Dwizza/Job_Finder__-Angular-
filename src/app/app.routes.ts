import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { JobComponent } from './pages/jobs/job/job.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {path: 'register', component: RegisterComponent, pathMatch: 'full'},
    {path: 'login', component: LoginComponent, pathMatch: 'full'},
    {path: '', component: HomeComponent, pathMatch: 'full'},
];
