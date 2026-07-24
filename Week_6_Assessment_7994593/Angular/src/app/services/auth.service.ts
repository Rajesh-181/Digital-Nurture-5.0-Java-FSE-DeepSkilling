import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Hardcoded for now as required by Step 75
  isLoggedIn: boolean = true;

  constructor() { }

  login(): void {
    this.isLoggedIn = true;
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
