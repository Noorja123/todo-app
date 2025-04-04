import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AppRoutingModule } from './app-routing.module'; // Uncommented
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Import Material Theme Module
import { MaterialThemeModule } from './material-theme.module';

// Import components
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { LoginComponent } from './components/login/login.component';
import { TodoComponent } from './components/todo/todo.component';

@NgModule({
  declarations: [
    // AppComponent,
    // ThemeToggleComponent, 
    // LoginComponent,       
    // TodoComponent         
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // AppRoutingModule,      // Uncommented
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    MaterialThemeModule
  ],
  providers: [],
  // bootstrap: [AppComponent]
})
export class AppModule { }