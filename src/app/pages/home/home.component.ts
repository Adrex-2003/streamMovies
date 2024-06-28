import { Component } from '@angular/core';
import { HeaderComponent } from '../../userPages/header/header.component';
import { MainComponent } from '../../userPages/main/main.component';
import { FooterComponent } from '../../userPages/footer/footer.component';
import { HeaderDashboardComponent } from '../../dashboard/header-dashboard/header-dashboard.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, MainComponent, FooterComponent, HeaderDashboardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}