import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Simulasi login (nanti diganti dengan API)
  login(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulasi validasi
        if (email === 'test@example.com' && password === 'password123') {
          resolve({
            status: 'success',
            user: {
              id: 1,
              name: 'Test User',
              email: email
            },
            token: 'dummy-token-12345'
          });
        } else {
          reject({
            error: {
              message: 'Email atau password salah!'
            }
          });
        }
      }, 1500);
    });
  }

  // Simpan token
  saveToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  // Ambil token
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Simpan data user
  saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Ambil data user
  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Cek apakah sudah login
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Logout
  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }
}