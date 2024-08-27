import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PanelComponent} from "./view/panel/panel.component";
import {NavbarComponent} from "./view/navbar/navbar.component";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PanelComponent, NavbarComponent, NgClass, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
