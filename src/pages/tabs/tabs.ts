import { Component } from '@angular/core';

import { PeriodosPage } from '../periodos/periodos';
import { RemediosPage } from '../remedios/remedios';
import { RemediosPeriodosPage } from '../remedios-periodos/remedios-periodos';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PeriodosPage;
  tab2Root = RemediosPage;
  tab3Root = RemediosPeriodosPage;

  constructor() {

  }
}
