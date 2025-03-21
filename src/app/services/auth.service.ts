import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Makes the service available application-wide
})
export class AuthService {
  private _user: string | null = null; // Replace `string` with your user type if needed

  // Getter for the user
  get user(): string | null {
    return this._user;
  }

  // Simulate login
  login(username: string): void {
    this._user = username; // Set the user (you can add more logic here)
    console.log(`User ${username} logged in.`);
  }

  // Simulate logout
  logout(): void {
    console.log(`User ${this._user} logged out.`);
    this._user = null; // Clear the user
  }

  // Check if a user is logged in
  isLoggedIn(): boolean {
    return this._user !== null;
  }
}