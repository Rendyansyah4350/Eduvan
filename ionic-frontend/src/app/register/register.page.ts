import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  IonText,
  IonCard,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonInput,
    IonButton,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonList,
    IonInputPasswordToggle,
    IonText,
    IonCard,
    RouterModule,
  ],
})
export class RegisterPage implements OnInit {
  email: string = '';
  password: string = '';
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      },
    );

    // 🔥 FIX: trigger ulang validator saat ada perubahan
    this.registerForm.valueChanges.subscribe(() => {
      this.registerForm.updateValueAndValidity({ onlySelf: false });
    });
  }

  // ✅ validasi password cocok
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { mismatch: true };
    }
    return null;
  }

  // ✅ biar gampang akses di HTML
  get f() {
    return this.registerForm.controls;
  }

  onRegister() {
    if (this.registerForm.invalid) {
      console.log('Form tidak valid');
      return;
    }

    console.log(this.registerForm.value);
  }
}
