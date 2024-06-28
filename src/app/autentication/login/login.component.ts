import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UserCredential } from 'firebase/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from '../resed-password/reset-password.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[ReactiveFormsModule, CommonModule, ResetPasswordComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('closeLogin') closeLogin!: ElementRef;
  @ViewChild('closeReset') closeReset!: ElementRef;

  display = true;
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  onInit(){
  }
  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.loginWithEmail(email, password).subscribe((userCredential: UserCredential) => {
        console.log('Login exitoso:', userCredential);
        
        this.router.navigate(['/movies']); // Redirigir después de inicio de sesión exitoso
      }, error => {
        console.error('Error en el inicio de sesión:', error);
        alert('Error en el inicio de sesión'); // Mostrar mensaje de error al usuario
      });
    }
  }
  closeResetW(){
    this.closeReset.nativeElement.style.display = 'none';
  }
  openReset(){
      this.closeReset.nativeElement.style.display = 'block';
  }
  home(){
    this.router.navigate(['/movies']);
  }
  loginWithGoogle() {
    this.authService.signInWithGoogle().subscribe(
      res => {
        console.log('Logged in with Google:', res);
        this.router.navigate(['/movies']);
      },
      error => {
        console.error('Error logging in with Google:', error);
      }
    );
  }
}
