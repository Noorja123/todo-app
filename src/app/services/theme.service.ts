import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light-theme' | 'dark-theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Use signal for reactive theme state
  theme = signal<Theme>('light-theme');
  
  constructor() {
    // Initialize theme from localStorage (if available)
    this.initTheme();
    
    // Set up an effect to apply theme changes
    effect(() => {
      this.applyTheme(this.theme());
    });
  }

  private initTheme(): void {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && (savedTheme === 'light-theme' || savedTheme === 'dark-theme')) {
      this.theme.set(savedTheme);
    } else {
      // Check user's system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.theme.set(prefersDark ? 'dark-theme' : 'light-theme');
    }
  }

  toggleTheme(): void {
    const newTheme = this.theme() === 'light-theme' ? 'dark-theme' : 'light-theme';
    this.setTheme(newTheme);
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
    localStorage.setItem('theme', theme);
  }

  private applyTheme(theme: Theme): void {
    // Remove any existing theme classes
    document.body.classList.remove('light-theme', 'dark-theme');
    
    // Add the current theme class to the body
    document.body.classList.add(theme);
    
    // Set data-theme attribute for components that use attribute selectors
    document.documentElement.setAttribute('data-theme', theme);
  }
}