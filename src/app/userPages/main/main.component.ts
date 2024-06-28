import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})

export class MainComponent {
  slideIndex: number = 1;
  movies: any[] = [];
  userState$: any;
  user$: any;
  loggedInUserEmail: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.userState$ = new BehaviorSubject<User | null>(null);
    this.user$ = this.userState$.asObservable();
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.userState$.next(user);
      if (user && user.email) {
        this.loggedInUserEmail = user.email;
      } else {
        this.loggedInUserEmail = null;
      }
    });
  }
  redirect(){
    if(this.loggedInUserEmail){
      this.router.navigate(['/movies']);
    }else{
      this.router.navigate(['/login']);
    }
  }

}
