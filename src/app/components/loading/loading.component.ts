import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import{ CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [MatProgressSpinnerModule,CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  
  router=inject(Router);
  isLoading = signal(true);

  constructor() {
      setTimeout(() => {
          this.isLoading.set(false);
          this.router.navigate(['/app-todo']); // Navigate to the todo page
      }, 1000);
  }
}