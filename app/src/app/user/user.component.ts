import { Component } from '@angular/core';

@Component({
  template: `
            <app-header></app-header>
            <app-sidebar></app-sidebar>
            <router-outlet></router-outlet>
            <app-footer></app-footer>
            `,
})
export class UserComponent {
  title = 'app';
}
