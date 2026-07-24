import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="not-found-container">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <button routerLink="/home" class="home-btn">Go to Home Dashboard</button>
    </div>
  `,
  styles: [`
    .not-found-container {
      padding: 30px;
      text-align: center;
      font-family: Arial, sans-serif;
    }
    .home-btn {
      padding: 8px 16px;
      margin-top: 15px;
      cursor: pointer;
      background-color: #f5f5f5;
      border: 1px solid #777;
      border-radius: 4px;
    }
    .home-btn:hover {
      background-color: #e5e5e5;
    }
  `],
  standalone: false
})
export class NotFoundComponent {}
