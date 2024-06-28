import { Component } from '@angular/core';
import { HeaderDashboardComponent } from '../../dashboard/header-dashboard/header-dashboard.component';
import { FooterComponent } from '../../userPages/footer/footer.component';
import { RepComponent } from '../../userPages/rep/rep.component';

@Component({
  selector: 'app-reproductor',
  standalone: true,
  imports: [HeaderDashboardComponent, FooterComponent, RepComponent],
  templateUrl: './reproductor.component.html',
  styleUrl: './reproductor.component.css'
})
export class ReproductorComponent {

}
