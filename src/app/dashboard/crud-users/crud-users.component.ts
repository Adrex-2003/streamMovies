import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';
import { FormsModule } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@Component({
  selector: 'app-crud-users',
  standalone: true,
  imports: [CommonModule, FormsModule, LazyLoadImageModule],
  templateUrl: './crud-users.component.html',
  styleUrl: './crud-users.component.css'
})
export class CrudUsersComponent {
  url = 'https://adrex-movies-sis-414-default-rtdb.firebaseio.com/'
  users: any[] = [];
  users2: any[] = [];
  dataService: any;
  search: string = '';

  constructor(private router: Router){
    this.getUsers();
  }
  
  ngOnInit(){
    this.getUsers();
  }
  
  async getUsers(){
    const res = await fetch(`${this.url}users.json`);
    const data = await res.json();
    this.users2 = data;
    this.users = Object.keys(data).map(key => ({
      ...data[key],
      id: key,
      backgroundColor: this.getRandomColor()
    }));
  }
  async deleteUser(email: any){
    const res = await fetch(`${this.url}users.json`);
    const data = await res.json();
    for(let key in data){
      if(data[key].email == email){
        await fetch(`${this.url}users/${key}.json`,{
          method: "DELETE"
        });
        alert('Eliminación exitosa');
        this.getUsers();
        break;
      }
    }
  }
  
  searchMovies(name: string): boolean {
    return name.toLowerCase().includes(this.search.toLowerCase());
  }
  
  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }  
}
