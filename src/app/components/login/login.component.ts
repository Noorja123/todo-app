import { Component, inject,HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj:any = {
    username:'',
    password:''
};

router=inject(Router);

loading = false;

right: any;

@HostListener('document:keydown.enter', ['$event'])
  onEnter(event: KeyboardEvent) {
    this.onLogin();
  }


onLogin() {
    this.loading = true; // Show spinner
    setTimeout(() => {
        if (this.loginObj.username === "admin" && this.loginObj.password === "14753") {
            this.router.navigate(["app-todo"]);
        } else {
            alert('Login Failed');
        }
        this.loading = false; // Hide spinner
    }, 1000);
}

}

