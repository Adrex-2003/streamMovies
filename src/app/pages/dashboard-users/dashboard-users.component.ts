import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CrudUsersComponent } from '../../dashboard/crud-users/crud-users.component';
import { MenuAdminComponent } from '../../dashboard/menu-admin/menu-admin.component';
@Component({
  selector: 'app-dashboard-users',
  standalone: true,
  imports: [CrudUsersComponent, MenuAdminComponent],
  templateUrl: './dashboard-users.component.html',
  styleUrl: './dashboard-users.component.css'
})
export class DashboardUsersComponent {
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
