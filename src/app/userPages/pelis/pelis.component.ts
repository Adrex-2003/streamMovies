import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { FormsModule } from '@angular/forms';
import { LoadPagesService } from '../../load-pages.service';

@Component({
  selector: 'app-pelis',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pelis.component.html',
  styleUrl: './pelis.component.css'
})
export class PelisComponent {
  url = 'https://adrex-movies-sis-414-default-rtdb.firebaseio.com/'
  movies: any[] = [];
  isLoggedIn: boolean = false;
  search: string = '';
  p: number = 1; // Página actual
  itemsPerPage: number = 16; // Cantidad de elementos por página
  totalItems: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dataService: DataService,
    private movieService: LoadPagesService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
    });
    
    await this.getTotalMovies();
    await this.loadMovies(this.p);
  }


  async loadMovies(page: number): Promise<void> {
    const start = (page - 1) * this.itemsPerPage;
    if (this.search != '') {
      this.movies = await this.movieService.searchMovies(this.search);
    } else {
      this.movies = await this.movieService.getMovies(start, this.itemsPerPage);
    }
  }

  async getTotalMovies(): Promise<void> {
    this.totalItems = await this.movieService.getTotalMovies();
  }

  async onPageChange(page: number): Promise<void> {
    this.p = page;
    await this.loadMovies(page);
  }
  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
  async onSearch(): Promise<void> {
    this.p = 1; // Resetear a la primera página al hacer una nueva búsqueda
    await this.loadMovies(this.p);
  }
  reproductor(title: string, description: string, category: string, poster: string, video: string) {
    if (this.isLoggedIn) {
      const movie = {
        title: title,
        description: description,
        category: category,
        poster: poster,
        video: video
      };
      this.dataService.enviarObjeto(movie);
      localStorage.setItem('selectedMovie', JSON.stringify(movie));
      this.router.navigate(['/reproductor']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
