import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MainDashboardComponent } from '../../dashboard/main-dashboard/main-dashboard.component';
import { HeaderDashboardComponent } from '../../dashboard/header-dashboard/header-dashboard.component';
import { FooterComponent } from '../../userPages/footer/footer.component';
import { FormComponent } from '../../dashboard/form/form.component';
import { MenuAdminComponent } from '../../dashboard/menu-admin/menu-admin.component';
import { CrudMoviesComponent } from '../../dashboard/crud-movies/crud-movies.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MainDashboardComponent, HeaderDashboardComponent, FooterComponent, FormComponent, MenuAdminComponent, CrudMoviesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  @ViewChild('icon') icon!: ElementRef;
  @ViewChild('menu') menu!: ElementRef;
  isDisplayed = false;

  toggleMenu(){
    
    this.isDisplayed = !this.isDisplayed;
    if(this.isDisplayed){
      this.menu.nativeElement.style.display = 'block';
    }else{ 
      this.menu.nativeElement.style.display = 'none';
    }
  }
  windowWidth: number = 0;
  windowHeight: number = 0;

  ngOnInit() {
    this.updateWindowSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateWindowSize();
  }

  updateWindowSize() {
    if (this.isBrowser()) {
      this.windowWidth = window.innerWidth;
      if(this.windowWidth > 1000){
        this.menu.nativeElement.style.display = 'block';
        this.isDisplayed = false
      }else{
        this.menu.nativeElement.style.display = 'none';
      }
    }
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  

}
