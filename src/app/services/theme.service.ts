import { Injectable, signal } from '@angular/core';

export type Theme = 'light-theme' | 'dark-theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Create a signal with 'light-theme' as the default value
  private themeSignal = signal<Theme>('light-theme');
  
  // Expose the theme as a readable signal
  public theme = this.themeSignal.asReadonly();
  
  constructor() {
    // Initialize theme from localStorage if available
    this.loadSavedTheme();
  }
  
  private loadSavedTheme(): void {
    const savedTheme = localStorage.getItem('app-theme') as Theme;
    if (savedTheme && (savedTheme === 'light-theme' || savedTheme === 'dark-theme')) {
      this.themeSignal.set(savedTheme);
      this.applyThemeToBody(savedTheme);
    } else {
      // Apply default theme if no saved theme
      this.applyThemeToBody('light-theme');
    }
  }
  
  toggleTheme(): void {
    const newTheme = this.themeSignal() === 'light-theme' ? 'dark-theme' : 'light-theme';
    this.themeSignal.set(newTheme);
    localStorage.setItem('app-theme', newTheme);
    this.applyThemeToBody(newTheme);
  }
  
  setTheme(theme: Theme): void {
    this.themeSignal.set(theme);
    localStorage.setItem('app-theme', theme);
    this.applyThemeToBody(theme);
  }
  
  private applyThemeToBody(theme: Theme): void {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(theme);
    
    // For debugging
    console.log('Theme applied:', theme);
    console.log('Body classes:', document.body.className);
  }
}