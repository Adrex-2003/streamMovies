import { Injectable } from '@angular/core';
interface Movie {
  title: string;
  // Añade otras propiedades si las conoces
}

@Injectable({
  providedIn: 'root'
})
export class LoadPagesService {
  url = 'https://adrex-movies-sis-414-default-rtdb.firebaseio.com/'
  constructor() { }

  async getMovies(start: number, limit: number): Promise<any[]> {
    const res = await fetch(`${this.url}movies.json`);
    const data = await res.json();
    const keys = Object.keys(data).sort();
    const paginatedKeys = keys.slice(start, start + limit);
    return paginatedKeys.map(key => data[key]);
  }

  async getTotalMovies(): Promise<number> {
    const res = await fetch(`${this.url}movies.json`);
    const data = await res.json();
    return Object.keys(data).length;
  }
  async searchMovies(query: string): Promise<Movie[]> {
    const res = await fetch(`${this.url}movies.json`);
    const data: { [key: string]: any } = await res.json();
    const movies: Movie[] = Object.values(data);
    return movies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()));
  }
}
