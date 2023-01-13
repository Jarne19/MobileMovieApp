import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhoneVerificationComponentPageRoutingModule } from './phone-verification-component-routing.module';

import { PhoneVerificationComponentPage } from './phone-verification-component.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhoneVerificationComponentPageRoutingModule
  ],
  declarations: [PhoneVerificationComponentPage]
})
export class PhoneVerificationComponentPageModule {}
