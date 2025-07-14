import { AfterViewInit, Component, inject, NgZone } from '@angular/core';
import { AuthService } from '../auth.service';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements AfterViewInit {
 private auth = inject(AuthService);
  private ngZone = inject(NgZone);
   ngAfterViewInit(): void {
    // Initialize Google Sign-In
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (res: any) => {
        this.ngZone.run(() => {
          const decoded: any = jwtDecode(res.credential);
          this.auth.setLogin(res.credential, { name: decoded.name, email: decoded.email });
        });
      },
    });

    // Render the button once the DOM is ready
    const signInDiv = document.getElementById('g_id_signin');
    if (signInDiv) {
      signInDiv.innerHTML = '';
      google.accounts.id.renderButton(signInDiv, {
        theme: 'outline',
        size: 'large',
        type: 'standard',
      });
    }
  }
}
