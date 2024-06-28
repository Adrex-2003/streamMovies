import { Component } from '@angular/core';
import { FooterComponent } from '../../userPages/footer/footer.component';
import { HeaderDashboardComponent } from '../../dashboard/header-dashboard/header-dashboard.component';
import { PelisComponent } from '../../userPages/pelis/pelis.component';
@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [HeaderDashboardComponent, FooterComponent, PelisComponent],
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.css'
})
export class PeliculasComponent {

}
