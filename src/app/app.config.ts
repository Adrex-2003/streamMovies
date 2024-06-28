import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { NgxPaginationModule } from 'ngx-pagination';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimationsAsync(), 
    provideFirebaseApp(() => initializeApp({
      "projectId":"adrex-movies-sis-414",
      "appId":"1:806195035353:web:90a2353c381991933892c8",
      "databaseURL":"https://adrex-movies-sis-414-default-rtdb.firebaseio.com",
      "storageBucket":"adrex-movies-sis-414.appspot.com",
      "apiKey":"AIzaSyBjnzbfuOFivy9YCkULmIqm5nRObQiFwK8",
      "authDomain":"adrex-movies-sis-414.firebaseapp.com",
      "messagingSenderId":"806195035353",
      "measurementId":"G-JPE6R15N4S"})), 
      provideAuth(() => getAuth())]
};