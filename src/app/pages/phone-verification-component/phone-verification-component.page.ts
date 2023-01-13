import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import countryNames from 'src/names.json';
import phoneCodes from 'src/phone.json';
export interface CallingCode {
  country: string;
  countryCode: string;
  isoCode2: string;
  flagEmoji: string;
}
@Component({
  selector: 'app-phone-verification-component',
  templateUrl: './phone-verification-component.page.html',
  styleUrls: ['./phone-verification-component.page.scss'],
})
export class PhoneVerificationComponentPage implements OnInit {

  countryCodes = this.#generateCallingCodeArray();
  code = '32';
  phone!: number;
  codeSent = false;
  verificationCode!: string;
  failed = false;
  gettingDisplayName = false;
  displayName!: string;

  constructor(private authService: AuthServiceService, private modalController: ModalController) {
  }

  ngOnInit() {
  }
  async sendCode(): Promise<void> {
    await this.authService.sendPhoneVerificationCode(this.#getPhoneNumber());
    this.codeSent = true;
    setTimeout(() => this.#reset(), 300000);
  }
  async validate(): Promise<void> {
    await this.authService.signInWithPhoneNumber(this.verificationCode);
    await this.#handleFirstLogIn();
  }
  async setUserName(): Promise<void> {
    await this.authService.updateDisplayName(this.displayName);
    await this.modalController.dismiss();
  }
  async dismissModal(): Promise<void> {
    await this.modalController.dismiss();
  }

  /**
   * @private
   */
  #reset(): void {
    this.verificationCode = '';
    this.failed = true;
    this.codeSent = false;
  }
  async #handleFirstLogIn(): Promise<void> {
    if (!this.authService.isLoggedIn()) {
      return;
    }

    const displayName = this.authService.getDisplayName();
    if (displayName && displayName.length > 0) {
      await this.modalController.dismiss();
    } else {
      this.gettingDisplayName = true;
    }
  }

  /**
   * @private
   */
  #getPhoneNumber(): string {
    return `+${this.code}${this.phone}`;
  }

  #generateCallingCodeArray(): CallingCode[] {
    const countryCodes: CallingCode[] = [];
    for (const isoCode2 of Object.keys(countryNames)) {
      countryCodes.push({
        country: countryNames[isoCode2],
        countryCode: phoneCodes[isoCode2],
        isoCode2,
        flagEmoji: this.#getFlagEmoji(isoCode2)
      });
    }
    return countryCodes;
  }

  #getFlagEmoji(isoCode2: any): string {
    return isoCode2
      .toUpperCase()
      .replace(/./g, (char: string) => String.fromCodePoint(127397 + char.charCodeAt(0)));
  }

}
