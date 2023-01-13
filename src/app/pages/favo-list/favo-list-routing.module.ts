import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoListPage } from './favo-list.page';

const routes: Routes = [
  {
    path: '',
    component: FavoListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoListPageRoutingModule {}
