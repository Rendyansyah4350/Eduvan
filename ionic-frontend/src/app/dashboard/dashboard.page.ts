/**
 * DashboardPage - Halaman Utama Setelah Login
 * 
 * Fungsi: Menampilkan dashboard dengan greeting user, statistik, dan aktivitas terbaru
 * Author: Eduvan Team
 * Created: 2026
 */

// Import library yang diperlukan dari Angular dan Ionic
import { Component, OnInit } from '@angular/core';           // Component decorator dan lifecycle hook
import { CommonModule } from '@angular/common';              // Untuk directive seperti *ngIf, *ngFor
import { FormsModule } from '@angular/forms';                // Untuk two-way binding
import { Router, RouterModule } from '@angular/router';      // Untuk navigasi antar halaman

// Import komponen-komponen Ionic yang digunakan di HTML
import {
  IonHeader,          // Header halaman
  IonToolbar,         // Toolbar di header
  IonTitle,           // Judul halaman
  IonContent,         // Konten utama halaman
  IonButton,          // Tombol
  IonButtons,         // Container untuk tombol-tombol
  IonCard,            // Kartu untuk menampilkan statistik
  IonCardContent,     // Isi dari kartu
  IonIcon,            // Icon
  IonGrid,            // Grid system
  IonRow,             // Baris dalam grid
  IonCol,             // Kolom dalam grid
  IonAvatar,          // Avatar/foto profil
  IonLabel,           // Label text
  IonItem,            // Item dalam list
  IonList,            // Daftar/list
  IonMenuButton       // Tombol untuk membuka menu sidebar
} from '@ionic/angular/standalone';

// Import service untuk autentikasi
import { AuthService } from '../services/auth';

/**
 * Decorator @Component
 * Mendefinisikan metadata untuk komponen Dashboard
 */
@Component({
  selector: 'app-dashboard',                    // Nama tag HTML untuk komponen ini
  templateUrl: './dashboard.page.html',         // File HTML yang digunakan
  styleUrls: ['./dashboard.page.scss'],         // File CSS/SCSS yang digunakan
  standalone: true,                             // Komponen standalone (tidak perlu module)
  imports: [                                    // Import komponen yang digunakan
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonAvatar,
    IonLabel,
    IonItem,
    IonList,
    IonMenuButton,
    CommonModule,      // Untuk *ngIf, *ngFor, dll
    FormsModule,       // Untuk two-way binding
    RouterModule       // Untuk routerLink
  ]
})
export class DashboardPage implements OnInit {
  
  /**
   * PROPERTIES / VARIABLES
   */
  
  /**
   * user - Menyimpan data user yang sedang login
   * Diambil dari localStorage melalui AuthService
   * Tipe: any (bisa diubah menjadi interface User nanti)
   * Default: null (belum ada data)
   */
  user: any = null;
  
  /**
   * stats - Data statistik untuk ditampilkan di kartu
   * Ini data sementara (hardcoded), nanti bisa diambil dari API
   * 
   * @property totalCourses - Total kursus yang tersedia
   * @property completedCourses - Jumlah kursus yang sudah diselesaikan
   * @property totalHours - Total jam belajar
   * @property certificates - Jumlah sertifikat yang didapat
   */
  stats = {
    totalCourses: 12,      // Total kursus
    completedCourses: 5,   // Kursus selesai
    totalHours: 48,        // Jam belajar
    certificates: 3        // Sertifikat
  };

  /**
   * CONSTRUCTOR
   * Tempat untuk dependency injection (memasukkan service yang dibutuhkan)
   * 
   * @param authService - Service untuk autentikasi (login, logout, get user)
   * @param router - Service untuk navigasi antar halaman
   */
  constructor(
    private authService: AuthService,  // Inject AuthService
    private router: Router              // Inject Router untuk navigasi
  ) {}

  /**
   * ngOnInit() - Lifecycle Hook
   * Fungsi ini akan dijalankan OTOMATIS saat komponen pertama kali dibuat
   * 
   * Kegunaan:
   * 1. Mengambil data user yang login dari localStorage
   * 2. Mengecek apakah user ada, jika tidak redirect ke login
   * 3. Nanti bisa ditambahkan untuk mengambil data dari API
   */
  ngOnInit() {
    // Ambil data user dari localStorage melalui AuthService
    // getUser() akan mengembalikan object user atau null jika tidak ada
    this.user = this.authService.getUser();
    
    // Cek apakah user ada (tidak null)
    if (!this.user) {
      // Jika user tidak ada, berarti ada masalah dengan session
      // Redirect ke halaman login
      this.router.navigateByUrl('/login');
    }
    
    // TODO: Nanti tambahkan kode untuk mengambil data statistik dari API
    // this.loadUserStats();
  }

  /**
   * logout() - Fungsi untuk logout
   * 
   * Cara kerja:
   * 1. Memanggil method logout() dari AuthService
   *    Method ini akan menghapus token dan data user dari localStorage
   * 2. Redirect user ke halaman login
   * 3. replaceUrl: true artinya mengganti history browser (user tidak bisa kembali)
   */
  logout() {
    // Panggil method logout dari AuthService
    // Menghapus semua data autentikasi dari localStorage
    this.authService.logout();
    
    // Redirect ke halaman login
    // replaceUrl: true = tidak bisa tekan tombol back ke dashboard
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  /**
   * goToCourses() - Navigasi ke halaman daftar kursus
   * 
   * Fungsi ini dipanggil saat user mengklik tombol "Kursus Saya"
   * Nanti akan diimplementasikan setelah halaman courses dibuat
   */
  goToCourses() {
    // TODO: Implementasi navigasi ke halaman courses
    // this.router.navigateByUrl('/courses');
    console.log('Navigasi ke halaman kursus');
    
    // Sementara tampilkan alert/notifikasi
    this.showComingSoon();
  }

  /**
   * goToProfile() - Navigasi ke halaman profil user
   * 
   * Fungsi ini dipanggil saat user mengklik tombol "Profil Saya"
   * Nanti akan diimplementasikan setelah halaman profile dibuat
   */
  goToProfile() {
    // TODO: Implementasi navigasi ke halaman profile
    // this.router.navigateByUrl('/profile');
    console.log('Navigasi ke halaman profil');
    
    // Sementara tampilkan alert/notifikasi
    this.showComingSoon();
  }

  /**
   * showComingSoon() - Menampilkan notifikasi fitur sedang dalam pengembangan
   * 
   * Fungsi sementara untuk memberi tahu user bahwa fitur belum tersedia
   * Nanti bisa diganti dengan Toast atau Modal
   */
  private showComingSoon() {
    // Bisa ditambahkan toast notification nanti
    // Contoh: this.toastCtrl.create({ message: 'Fitur sedang dalam pengembangan' })
    console.log('Fitur ini akan segera hadir!');
  }

  /**
   * LOAD DATA FROM API (Tambahan nanti)
   * 
   * Method untuk mengambil data statistik dari API backend
   * Akan dipanggil di ngOnInit setelah user terkonfirmasi
   */
  // private async loadUserStats() {
  //   try {
  //     // Panggil API untuk mendapatkan statistik user
  //     const response = await this.apiService.getUserStats().toPromise();
  //     this.stats = response.data;
  //   } catch (error) {
  //     console.error('Gagal memuat statistik:', error);
  //   }
  // }

}