import { Component } from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {Router, RouterLink} from "@angular/router";
import {InputSwitchModule} from "primeng/inputswitch";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    ButtonDirective,
    RouterLink,
    InputSwitchModule,
    FormsModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token'); // Clear the token
    this.router.navigate(['/login']).then(r => console.log('Redirected to login')); // Navigate to the login page
  }
}
