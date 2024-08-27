import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonDirective } from 'primeng/button';
import { DataService } from '../../server/data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonDirective,
    HttpClientModule
  ],
  providers: [DataService, HttpClient],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private dataService: DataService) {}

  login() {
    this.dataService.login(this.username, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response); // Store the actual token
        this.router.navigate(['/navbar']).then(() => console.log('Redirected to navbar'));
      },
      error: (error) => {
        console.error('Login failed', error);
        alert('Invalid username or password');
      }
    });
  }

  /*
      IF YOU WANT TO REGISTER NEW USER ACTIVATE THIS METHOD AND ADD BUTTON TO DO IT IN HTML
      NECESSARY CONNECTIONS ARE SET. ALSO ADD REGISTER METHOD TO DATA.SERVICE.TS.

      <div class="p-field">
      <button pButton type="button" label="Register" (click)="register()"></button>
      </div>


    register() {
    this.dataService.register(this.username, this.password).subscribe({
      next: () => {
        alert('User registered successfully');
      },
      error: (error) => {
        console.error('Registration failed', error);
        alert('Registration failed');
      }
    });
  }*/

}
