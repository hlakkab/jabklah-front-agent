import { Injectable } from '@angular/core';
const TOKEN_KEY = 'auth-token';
const ADMIN_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }
  signOut(): void {
    window.sessionStorage.clear();
  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public saveAgent(agent: any): void {
    window.sessionStorage.removeItem(ADMIN_KEY);
    window.sessionStorage.setItem(ADMIN_KEY, JSON.stringify(agent));
  }
  public getAgent(): any {
    const user = window.sessionStorage.getItem(ADMIN_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}