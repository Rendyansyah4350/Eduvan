import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
  IonCard
} from '@ionic/angular/standalone';

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

  constructor() {}

  ngOnInit() {}

  login() {
    console.log("Email:", this.email);
    console.log("Password:", this.password);

    // nanti di sini bisa kirim API ke Laravel
  }

}