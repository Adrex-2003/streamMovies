import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  toggleMenu(): void {
    const x = document.getElementById("myTopnav");
    if (x !== null) {
      if (x.className === "topnav") {
        x.className += " responsive";
      } else {
        x.className = "topnav";
      }
    }
  }
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 200) { // Cambia el fondo después de desplazarse 100px
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }
  
}
