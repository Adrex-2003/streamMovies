import { Component, OnDestroy, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-rep',
  templateUrl: './rep.component.html',
  imports:[CommonModule],
  styleUrls: ['./rep.component.css'],
  standalone: true
})
export class RepComponent implements OnInit, OnDestroy {
  movie: any;
  safeVideoUrl: SafeResourceUrl | undefined;
  private subscription: Subscription | undefined;

  constructor(
    private dataService: DataService,
    private sanitizer: DomSanitizer,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.dataService.obtenerObjeto().subscribe(objeto => {
      this.setMovie(objeto);
    }, error => {
      console.error('Error al obtener el objeto:', error);
    });

    // Verificar si estamos en el navegador antes de usar localStorage
    if (isPlatformBrowser(this.platformId)) {
      const storedMovie = localStorage.getItem('selectedMovie');
      if (storedMovie && !this.movie) {
        this.setMovie(JSON.parse(storedMovie));
      }
    }
  }

  private setMovie(movie: any) {
    this.movie = movie;
    if (this.movie && this.movie.video) {
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.movie.video);
    }
  }
}