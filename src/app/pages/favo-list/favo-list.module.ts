import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoListPageRoutingModule } from './favo-list-routing.module';

import { FavoListPage } from './favo-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoListPageRoutingModule
  ],
  declarations: [FavoListPage]
})
export class FavoListPageModule {}
