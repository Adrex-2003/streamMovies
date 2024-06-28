import { Routes } from '@angular/router';
import { LoginComponent } from './autentication/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { FormComponent } from './dashboard/form/form.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AcountComponent } from './autentication/acount/acount.component';
import { DashboardCrudComponent } from './pages/dashboard-crud/dashboard-crud.component';
import { ResetPasswordComponent } from './autentication/resed-password/reset-password.component';
import { PeliculasComponent } from './pages/peliculas/peliculas.component';
import { ReproductorComponent } from './pages/reproductor/reproductor.component';
import { DashboardUsersComponent } from './pages/dashboard-users/dashboard-users.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent},
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent},
    { path: 'addUpdateMovie', component: FormComponent},
    { path: 'createAcount', component: AcountComponent},
    { path: 'movies-crud', component: DashboardCrudComponent},
    { path: 'password-reset', component: ResetPasswordComponent},
    { path: 'movies', component: PeliculasComponent},
    { path: 'reproductor', component: ReproductorComponent},
    { path: 'users', component: DashboardUsersComponent}
];