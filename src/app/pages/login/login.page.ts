import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import {PhoneVerificationComponentPage} from 'src/app/pages/phone-verification-component/phone-verification-component.page';
import { Auth } from '@angular/fire/auth'
import { FirebaseAuthentication, User } from '@capacitor-firebase/authentication';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = {
    email: '',
    password: ''
  }

  isNative = Capacitor.isNativePlatform();
  constructor(public authService: AuthServiceService,private modalController: ModalController,private auth: Auth) {}
  async showPhoneVerification(): Promise<void> {
    const modal = await this.modalController.create({
      component: PhoneVerificationComponentPage
    });
    return await modal.present();
  }
  ngOnInit() {
    
  }
  async login(){
    await this.authService.signInWithEmailAndPassword(this.user);
  }
  
  async register(){
    await this.authService.createUser(this.user);
  }
}
