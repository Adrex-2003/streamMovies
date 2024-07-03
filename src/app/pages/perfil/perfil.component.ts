import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'firebase/auth';
import { emit } from 'process';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements AfterViewInit{
  update: boolean = false;
  @ViewChild('lastName') lastName!: ElementRef;
  @ViewChild('name') name!: ElementRef;
  
  url: string = 'https://adrex-movies-sis-414-default-rtdb.firebaseio.com/';
  loggedInUserEmail: string | null = null;
  id: string | null = null;
  user = {
    name: '',
    lastName: '',
    email: '',
    rol: ''
  };
  user$: Observable<User | null>;
  private userState$: BehaviorSubject<User | null>;

  ngAfterViewInit(): void {
  }
  

  editar(){
    this.update = !this.update;
  }

  constructor(private authService: AuthService, private router: Router) {
    this.userState$ = new BehaviorSubject<User | null>(null);
    this.user$ = this.userState$.asObservable();
  }
  

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.userState$.next(user);
      if (user && user.email) {
        this.loggedInUserEmail = user.email;
        this.searchUser();
      }
    });
  }

  async searchUser() {
      try {
        const resp = await fetch(`${this.url}users.json`);
        const data = await resp.json();
        console.log(data);
        for (let key in data) {
          if (data[key].email.toLowerCase() === this.loggedInUserEmail?.toLocaleLowerCase()) {
            this.id = key;
            this.user = data[key];
            break;
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
  }

  async updateData(){
          const role = {
            name: this.name.nativeElement.value,
            lastName: this.lastName.nativeElement.value,
            email: this.user.email,
            rol: this.user.rol
          }
          const res = await fetch(`${this.url}users/${this.id}.json`,{
            method: "PUT",
            body: JSON.stringify(role),
            headers:{
              'Content-type':'aplication/json; charset=UTF-8'
            }
          });
          this.update = !this.update;
          this.searchUser();
  }
  volver(){
    this.router.navigate(['/home']);
  }
  cancelar(){
    this.update = !this.update;
  }
}
