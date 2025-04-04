import { Injectable, Renderer2, RendererFactory2, inject, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light-theme' | 'dark-theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private readonly THEME_KEY = 'app-theme';
  
  // Use signal for reactive updates
  private _theme = signal<Theme>('light-theme');
  
  // Public readonly computed signal for components to subscribe to
  public theme = this._theme.asReadonly();
  
  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initializeTheme();
  }
  
  private initializeTheme(): void {
    // Get saved theme from localStorage or use default
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Use saved theme or system preference
    const initialTheme = savedTheme || (prefersDarkMode ? 'dark-theme' : 'light-theme');
    this.setTheme(initialTheme, false);
    
    // Apply theme to document immediately
    this.applyThemeToDocument(initialTheme);
  }
  
  public setTheme(theme: Theme, savePreference = true): void {
    // Update signal value
    this._theme.set(theme);
    
    // Apply theme to document
    this.applyThemeToDocument(theme);
    
    // Save preference if requested
    if (savePreference) {
      localStorage.setItem(this.THEME_KEY, theme);
    }
  }
  
  private applyThemeToDocument(theme: Theme): void {
    // Remove any existing theme classes
    document.body.classList.remove('light-theme', 'dark-theme');
    
    // Add new theme class
    document.body.classList.add(theme);
    
    // Set data attribute for CSS selectors
    document.documentElement.setAttribute('data-theme', theme);
  }
  
  public toggleTheme(): void {
    const newTheme = this.theme() === 'light-theme' ? 'dark-theme' : 'light-theme';
    this.setTheme(newTheme);
  }
  
  // Helper method to check if current theme is dark
  public isDarkTheme(): boolean {
    return this.theme() === 'dark-theme';
  }
}