import { Component } from '@angular/core';

@Component({
  template: `
            <app-header></app-header>
            <app-sidebar></app-sidebar>
            <router-outlet></router-outlet>
            <app-footer></app-footer>
            <h1>bkjbj</h1>
            `,
})
export class AdminComponent {
  title = 'app';
}
