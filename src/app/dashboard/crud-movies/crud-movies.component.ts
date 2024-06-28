import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';
import { FormsModule } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@Component({
  selector: 'app-crud-movies',
  standalone: true,
  imports: [CommonModule, FormsModule, LazyLoadImageModule],
  templateUrl: './crud-movies.component.html',
  styleUrl: './crud-movies.component.css'
})
export class CrudMoviesComponent implements OnInit{
  url = 'https://adrex-movies-sis-414-default-rtdb.firebaseio.com/'
  movies: any[] = [];
  dataService: any;
  search: string = '';

  constructor(private router: Router, private idService: DataService){
    this.getMovie();
  }

  ngOnInit(){
    this.getMovie();
  }
  addMovie(){
    this.router.navigate(['/addUpdateMovie']);
  }
  async getMovie(){
    const res = await fetch(`${this.url}movies.json`);
    const data = await res.json();
    this.movies = data;
  }
  async deleteMovie(id: any){
    await fetch(`${this.url}movies/${id}.json`,{
      method: "DELETE"
    });
    alert('Eliminación exitosa');
    this.getMovie();
  }
  
  sendId(id: string){
    this.idService.changeId(id);
    this.router.navigate(['/addUpdateMovie']);
  }
  searchMovies(title: string): boolean {
    return title.toLowerCase().includes(this.search.toLowerCase());
  }
}
