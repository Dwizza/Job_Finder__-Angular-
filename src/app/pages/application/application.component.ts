import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Application, ApplicationStatus } from '../../core/models/application.model';
import { Router } from '@angular/router';
import { ApplicationService } from '../../core/services/application-service/application.service';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule, FormsModule, NavBarComponent],
  templateUrl: './application.component.html',
})
export class ApplicationsComponent implements OnInit {
  apps: Application[] = [];
  loading = false;
  errorMsg = '';

  statuses: ApplicationStatus[] = ['en_attente', 'accepte', 'refuse'];

  constructor(private applService: ApplicationService, private router: Router) { }

  getCurrentUser() {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  }

  ngOnInit(): void {
    const user = this.getCurrentUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    this.loading = true;
    this.applService.getByUserId(user.id).subscribe({
      next: (data) => {
        this.apps = (data || []).sort((a, b) => (b.date_added ?? '').localeCompare(a.date_added ?? ''));
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Failed to load applications';
        this.loading = false;
      }
    });
  }

  changeStatus(app: Application, status: ApplicationStatus) {
    if (!app.id) return;
    this.applService.update(app.id, { status }).subscribe({
      next: (updated) => app.status = updated.status,
      error: () => this.errorMsg = 'Failed to update status'
    });
  }

  saveNotes(app: Application) {
    if (!app.id) return;
    this.applService.update(app.id, { notes: app.notes ?? '' }).subscribe({
      next: () => { },
      error: () => this.errorMsg = 'Failed to save notes'
    });
  }

  remove(app: Application) {
    if (!app.id) return;
    this.applService.delete(app.id).subscribe({
      next: () => this.apps = this.apps.filter(x => x.id !== app.id),
      error: () => this.errorMsg = 'Failed to delete'
    });
  }
}
