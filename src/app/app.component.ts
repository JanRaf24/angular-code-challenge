import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-breadcrumb></app-breadcrumb>
    <div class="container py-4 px-3 mx-auto">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
}
