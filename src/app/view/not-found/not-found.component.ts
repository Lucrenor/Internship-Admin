import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <h1>404 - Not Found</h1>
    <p>The page you are looking for does not exist.</p>
  `,
  standalone: true,
  styles: [`
    h1 {
      color: #2b3f87;
      font-size: 42px;
    }

    p {
      font-size: 24px;
    }
  `]
})
export class NotFoundComponent {}
