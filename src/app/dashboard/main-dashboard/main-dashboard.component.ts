import { Component, OnInit } from '@angular/core';
import { HeaderDashboardComponent } from '../header-dashboard/header-dashboard.component';
import { FooterComponent } from '../../userPages/footer/footer.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuAdminComponent } from '../menu-admin/menu-admin.component';

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [HeaderDashboardComponent, FooterComponent, CommonModule, MenuAdminComponent],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.css'
})
export class MainDashboardComponent implements OnInit {
  url = 'https://adrex-movies-sis-414-default-rtdb.firebaseio.com/';
  movies: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.getMovies();
  }

  async getMovies() {
    try {
      const res = await fetch(`${this.url}movies.json`);
      const data = await res.json();
      if (data) {
        this.movies = data; // Convierte el objeto JSON a un array de películas
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      this.getMovies();
      // Aquí podrías manejar el error, por ejemplo, mostrar un mensaje al usuario
    }
  }
}
