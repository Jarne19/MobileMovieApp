import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhoneVerificationComponentPage } from './phone-verification-component.page';

const routes: Routes = [
  {
    path: '',
    component: PhoneVerificationComponentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhoneVerificationComponentPageRoutingModule {}
