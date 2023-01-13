import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {environment} from '../environments/environment';
import {getAuth, provideAuth} from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

const firebaseConfig = {
  apiKey: "AIzaSyBDrMTsH1pEdjfBqPncPrlJY4fVoSfge_0",
  authDomain: "movieapp-6ace4.firebaseapp.com",
  projectId: "movieapp-6ace4",
  storageBucket: "movieapp-6ace4.appspot.com",
  messagingSenderId: "507431757678",
  appId: "1:507431757678:web:7066119270591263b6437f"
}
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  HttpClientModule,
  provideFirebaseApp(() => initializeApp(firebaseConfig)),
  provideAuth(() => getAuth())
],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
