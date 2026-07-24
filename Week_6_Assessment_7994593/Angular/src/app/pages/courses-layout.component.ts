import { Component } from '@angular/core';

@Component({
  selector: 'app-courses-layout',
  template: `
    <div class="courses-layout-container">
      <!-- Child routes render here -->
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .courses-layout-container {
      padding: 10px;
    }
  `],
  standalone: false
})
export class CoursesLayoutComponent {}
