import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <div class="container my-4 p-0 shadow rounded mx-auto overflow-auto app-container">
      <app-breadcrumb></app-breadcrumb>
      <div class="container py-4 px-3 mx-auto">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AppComponent {
}
