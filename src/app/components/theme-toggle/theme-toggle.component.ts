import { Component, inject } from '@angular/core';
import { ThemeService, Theme } from '../../services/theme.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css'
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);
  currentTheme = this.themeService.theme;
  
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
  
  setTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }

}
