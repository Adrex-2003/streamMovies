import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { AuthService } from '../../auth/auth.service'; 
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserCredential } from 'firebase/auth';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-acount',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './acount.component.html',
  styleUrl: './acount.component.css'
})
export class AcountComponent {
  @ViewChild('names') names!: ElementRef;
  @ViewChild('lastNames') lastNames!: ElementRef;
  @ViewChild('emails') emails!: ElementRef;

  url = 'https://adrex-movies-sis-414-default-rtdb.firebaseio.com/';
  registerForm: FormGroup;
  name: string = ''
  lastName: string = ''
  email: string = ''

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    // Creamos el formulario con sus validaciones
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.checkPasswords });
  }

  // Método para validar que las contraseñas coincidan
  checkPasswords(group: FormGroup) {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  register() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      this.authService.registerWithEmail(email, password).subscribe((userCredential: UserCredential) => {
        this.postUsers();
        console.log('Registro exitoso:', userCredential);
        this.router.navigate(['/home']);
      }, error => {
        console.error('Error en el registro:', error);
        // Aquí podrías manejar errores específicos, como mostrar un mensaje al usuario
      });
    }
  }
  async postUsers(){
    const user = {
      name : this.names.nativeElement.value,
      lastName: this.lastNames.nativeElement.value,
      email: this.emails.nativeElement.value
    }
    console.log(user);
    
    await fetch(`${this.url}users.json`,{
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'aplication/json; charset = UTF-8'
      }
    });
  }
}
