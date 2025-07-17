import { computed, Injectable, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'id_token';
  private userKey = 'user';
  private renewTimer: any;
  readonly idToken = signal<string | null>(localStorage.getItem(this.tokenKey));
  readonly user = signal<any>(localStorage.getItem(this.userKey) ? JSON.parse(localStorage.getItem(this.userKey)!) : null);
  readonly isLoggedIn = computed(() => !!this.idToken() && !this.isTokenExpired());
  constructor() {
    this.scheduleTokenRenewal();
   }
   private getTokenExpiry(token: string): number {
    const payload: { exp: number } = jwtDecode(token);
    return payload.exp * 1000; // Convert to milliseconds
  }
   isTokenExpired(): boolean {
    const token = this.idToken();
    if (!token) return true;
    return Date.now() > this.getTokenExpiry(token);
  }
  getUserNameFromJwt(): string {
    const token = this.idToken();
    if (!token) return '';
    const payload: any = jwtDecode(token);
    return payload.name || payload.email || 'User';
  }
  private scheduleTokenRenewal() {
    const token = this.idToken();
    if (!token) return;

    const expiry = this.getTokenExpiry(token);
    const renewIn = expiry - Date.now() - 60_000;

    if (renewIn > 0) {
      clearTimeout(this.renewTimer);
      this.renewTimer = setTimeout(() => {
        google.accounts.id.prompt(); // Silent
      }, renewIn);
    }
  }
  setLogin(token: string, user: any) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.idToken.set(token);
    this.user.set(user);
    this.scheduleTokenRenewal();
  }
  logout() {
    // Clear local session state immediately so the UI updates.
    localStorage.clear();
    this.idToken.set(null);
    this.user.set(null);
    clearTimeout(this.renewTimer);
  }
}
