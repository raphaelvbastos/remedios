import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PeriodosPage } from './periodos';

@NgModule({
  declarations: [
    PeriodosPage,
  ],
  imports: [
    IonicPageModule.forChild(PeriodosPage),
  ],
})
export class PeriodosPageModule {}
