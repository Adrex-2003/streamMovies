import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  url = 'https://adrex-movies-sis-414-default-rtdb.firebaseio.com/'
  title: string = '';
  category: string = '';
  description: string = '';
  poster: string = '';
  video: string = '';
  movies: any[] = [];
  posterValid: boolean | null = null;
  id: string | null = null;
  update: boolean |null = null;

  constructor(private router: Router, private idService: DataService){
  }
  ngOnInit(): void {
    this.update = false
    this.idService.currentId$.subscribe(id => {
      this.id = id;
      if(this.id != null){
        this.getMovie();
        this.update = true;
      }else{
      }
    });
    
  }

  async getMovie(){
    const res = await fetch(`${this.url}movies/${this.id}.json`);
    const mov = await res.json();
    this.title = mov.title;
    this.description = mov.description;
    this.category = mov.category;
    this.poster = mov.poster;
    this.video = mov.video;
  }
  async updateData(){
    const movie = {
      title: this.title,
      category: this.category,
      description: this.description,
      poster: this.poster,
      video: this.video

    }
    const res = await fetch(`${this.url}movies/${this.id}.json`,{
      method: "PUT",
      body: JSON.stringify(movie),
      headers:{
        'Content-type':'aplication/json; charset=UTF-8'
      }
    });
    alert("se actualizó Pelicula con éxito");
    this.redirect();
  }

  validatePoster(): void {
    const urlPattern = /\.(jpeg|jpg|gif|png|svg|webp)$/i;
    this.posterValid = urlPattern.test(this.poster);
    if(this.posterValid){
      this.checkImageExists();
    }else{
      alert("url invalida")
    }
  }
  checkImageExists(){
    const img = new Image();
    img.src = this.poster;
    img.onload = ()=>{
      if(this.id == null){
        this.postMovie();
      }else{
        this.updateData();
      }
    };
    img.onerror = ()=>{
      alert("url invalida");
    } 
  }

  validForm(){
    if(this.title=='' || this.category == '' || this.description == '' || this.poster == '' || this.video == ''){
      alert("Complete todos los campos");
    }else{
      this.checkImageExists();
    }
  }
  async postMovie(){
    const movie = {
      title: this.title,
      category: this.category,
      description: this.description,
      poster: this.poster,
      video: this.video

    }
    await fetch(`${this.url}movies.json`,{
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-type': 'aplication/json; charset = UTF-8'
      }
    });
    alert("se Añadió Pelicula con éxito");
    this.redirect();
  }
  close(){
    this.router.navigate(['/movies-crud']);
    this.idService.changeId(null);
  }
  redirect(){
    this.router.navigate(['/movies-crud']);
  }
}
