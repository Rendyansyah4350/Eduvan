import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';  // Tambahkan Router

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonButton,
  IonList,
  IonInputPasswordToggle,
  IonCard,
  LoadingController,
  ToastController
} from '@ionic/angular/standalone';

import { AuthService } from '../services/auth'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonInput,
    IonButton,
    IonList,
    IonInputPasswordToggle,
    IonCard,
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,  // Tambahkan
    private router: Router              // Tambahkan
  ) {}

  ngOnInit() {
    // Cek jika sudah login, langsung ke halaman home
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/login', { replaceUrl: true }); // kalo (/dashboard) malah masuk lgs ke dashboard, kalo login gabisa masuk ke dashboard karna tidak ada account nya
    }
  }

  async login() {
    // Validasi sederhana
    if (!this.email || !this.password) {
      this.showToast('Email dan password harus diisi!', 'warning');
      return;
    }

    // Tampilkan loading
    const loading = await this.loadingCtrl.create({
      message: 'Memproses login...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      // Panggil AuthService
      const response = await this.authService.login(this.email, this.password);
      
      // Simpan token dan user
      this.authService.saveToken(response.token);
      this.authService.saveUser(response.user);
      
      // Tampilkan pesan sukses
      await this.showToast('Login berhasil!', 'success');
      
      // Redirect ke halaman home
      this.router.navigateByUrl('/dashboard', { replaceUrl: true });
      
    } catch (error: any) {
      // Tampilkan pesan error
      let errorMessage = 'Login gagal!';
      if (error.error?.message) {
        errorMessage = error.error.message;
      }
      
      this.showToast(errorMessage, 'danger');
    } finally {
      loading.dismiss();
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'bottom',
      buttons: [
        {
          text: 'Tutup',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }

}