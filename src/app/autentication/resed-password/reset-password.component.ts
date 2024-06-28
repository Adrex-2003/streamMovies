import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent{

  display = true;
  resetForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  onSubmit() {
    if (this.resetForm.valid) {
      const email = this.resetForm.value.email;
      this.authService.resetPassword(email).subscribe(
        () => {
          alert('Se ha enviado un correo electrónico para restablecer tu contraseña.');
          this.resetForm.reset();
          this.router.navigate(['login'])
        },
        (error) => {
          console.error('Error al enviar el correo electrónico de restablecimiento:', error);
          alert('Ha ocurrido un error al enviar el correo electrónico de restablecimiento. Por favor, intenta nuevamente.');
        }
      );
    }
  }
}
