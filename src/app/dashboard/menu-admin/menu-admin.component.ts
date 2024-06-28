import { Component, ElementRef, ViewChild} from '@angular/core';
import { NgModel } from '@angular/forms';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-menu-admin',
  standalone: true,
  imports: [],
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.css'
})
export class MenuAdminComponent implements AfterViewInit{
  @ViewChild('myDiv') myDiv!: ElementRef;
  @ViewChild('icon') icon!: ElementRef;
  @ViewChild('nav') nav!: ElementRef;
  
  isDisplayed = false;
  constructor (){
  }
  toggleMenu(){
    this.isDisplayed = !this.isDisplayed;
    if(this.isDisplayed){
      this.myDiv.nativeElement.style.display = 'block';
      this.icon.nativeElement.style.justifyContent= 'left';
      this.nav.nativeElement.style.width = '70%';
    }else{ 
        this.myDiv.nativeElement.style.display = 'none';
        this.nav.nativeElement.style.width = '0%';
    }
  }
  ngAfterViewInit() {
    // Verificar el estado inicial del display al cargar la página
    if (this.myDiv.nativeElement.style.display === 'none') {
      alert('hello');
    }
  }

}
