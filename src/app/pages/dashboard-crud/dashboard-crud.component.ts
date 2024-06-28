import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CrudMoviesComponent } from '../../dashboard/crud-movies/crud-movies.component';
import { MenuAdminComponent } from '../../dashboard/menu-admin/menu-admin.component';
import { FormComponent } from '../../dashboard/form/form.component';
@Component({
  selector: 'app-dashboard-crud',
  standalone: true,
  imports: [CrudMoviesComponent, MenuAdminComponent, FormComponent],
  templateUrl: './dashboard-crud.component.html',
  styleUrl: './dashboard-crud.component.css'
})
export class DashboardCrudComponent {
  @ViewChild('icon') icon!: ElementRef;
  @ViewChild('menu') menu!: ElementRef;
  isDisplayed = false;
  windowWidth: number = 0;
  windowHeight: number = 0;

  constructor() { }

  ngOnInit() {
    // No llamamos a updateWindowSize aquí porque las ViewChilds aún no están inicializadas
  }

  ngAfterViewInit() {
    this.updateWindowSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateWindowSize();
  }

  toggleMenu() {
    this.isDisplayed = !this.isDisplayed;
    if (this.isDisplayed) {
      this.menu.nativeElement.style.display = 'block';
    } else {
      this.menu.nativeElement.style.display = 'none';
    }
  }

  updateWindowSize() {
    if (this.isBrowser()) {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth > 1000) {
        this.menu.nativeElement.style.display = 'block';
        this.isDisplayed = false;
      } else {
        this.menu.nativeElement.style.display = 'none';
      }
    }
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined';
  }
}