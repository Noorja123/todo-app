import { Component, inject,HostListener, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatProgressSpinnerModule,CommonModule,MatFormFieldModule,MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  loginObj:any = {
    username:'',
    password:''
  };

  isLoading = signal(false);
  router=inject(Router);

  right: any;

  @HostListener('document:keydown.enter', ['$event'])
  onEnter(event: KeyboardEvent) {
    this.onLogin();
  }

  onLogin() {
      this.isLoading.set(true); // Show spinner
      if(this.loginObj.username === 'admin' && this.loginObj.password === '14753') {
      localStorage.setItem('auth', 'true'); // Simulate login
      this.router.navigate(['/loading']); // Navigate to loading page
  }else{
  this.isLoading.set(false); // Stop spinner on wrong credentials
  alert('Login Failed'); // Show error message

}
}
}
