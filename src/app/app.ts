import {  Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';
import { Login } from "./login/login";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, Login],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  auth = inject(AuthService);

  constructor() {
  }

  logout() {
    this.auth.logout();
    google.accounts.id.disableAutoSelect(); // Optional but recommended
  }
}