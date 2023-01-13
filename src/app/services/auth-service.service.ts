import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, PhoneAuthProvider, signInWithCredential, signOut, updateProfile, user } from '@angular/fire/auth';
import { GithubAuthProvider } from "firebase/auth";
import { Router } from '@angular/router';
import { FirebaseAuthentication, User } from '@capacitor-firebase/authentication';
import { Capacitor } from '@capacitor/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  public currentUser: BehaviorSubject<null | User> = new BehaviorSubject<null | User>(null);
  constructor(private auth: Auth, private router: Router) {
    this.auth.onAuthStateChanged(user => this.setCurrentUser(user));
  }
  isLoggedIn(): boolean {
    return this.currentUser.value !== null && this.currentUser.value !== undefined;
  }
  getDisplayName(): string | null {
    if (this.currentUser.value) {
      return this.currentUser.value.displayName;
    }
    return null;
  }
  getEmail(): string |null {
    if (this.currentUser.value) {
      return this.currentUser.value.email;
    }
    return null;
  }
  getUserUID(): string | null {
    if (this.currentUser.value) {
      return this.currentUser.value.uid;
    }
    return null;
  }
  async signOut(): Promise<void> {
    await FirebaseAuthentication.signOut();
    if (Capacitor.isNativePlatform()) {
      await signOut(this.auth);
    }
  }
  async signInWithGoogle(): Promise<void> {
    const result = await FirebaseAuthentication.signInWithGoogle();
    if (!result.credential?.idToken) {
      return;
    }
    if (Capacitor.isNativePlatform()) {
      const credential = GoogleAuthProvider.credential(result.credential.idToken);
      await signInWithCredential(this.auth, credential);
    }
  }
  async updateDisplayName(displayName: string): Promise<void> {
    if (!this.auth.currentUser) {
      return;
    }
    await updateProfile(this.auth.currentUser, {
      displayName
    });
  }
  #verificationId: string;
  async sendPhoneVerificationCode(phoneNumber: string): Promise<void> {
      const {verificationId} = await FirebaseAuthentication.signInWithPhoneNumber({phoneNumber});
      this.#verificationId = verificationId;
  }
  async signInWithPhoneNumber(verificationCode: string): Promise<void> {        
      const credential = 
          PhoneAuthProvider.credential(this.#verificationId, verificationCode);
      await signInWithCredential(this.auth, credential);   
  }
  /**
   * @param user The new user.
   * @private
   */
  private async setCurrentUser(user: User | null): Promise<void> {
    this.currentUser.next(user);
    if (this.currentUser.value) {
      await this.router.navigate(['/']);
    } else {
      await this.router.navigate(['/login']);
    }
  }
  async signInWithEmailAndPassword(user: any){
    const result = await FirebaseAuthentication.signInWithEmailAndPassword(user);
    if(!result.credential?.idToken){
      return;
    }
  }
  async createUser(user: any){
    const result = await FirebaseAuthentication.createUserWithEmailAndPassword(user);
    if(!result.credential?.idToken){
      return;
    }
  }

  async signInWithGithub(){
    const result = await FirebaseAuthentication.signInWithGithub();
    if (!result.credential?.idToken) {
      return;
    }
    if (Capacitor.isNativePlatform()) {
      const credential = GithubAuthProvider.credential(result.credential.idToken);
      await signInWithCredential(this.auth, credential);
    }
  };
}