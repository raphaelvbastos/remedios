import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PeriodosProvider, Periodo } from "../../providers/periodos/periodos";
import { PeriodoPage } from '../periodo/periodo';

/**
 * Generated class for the PeriodosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-periodos',
  templateUrl: 'periodos.html',
})
export class PeriodosPage {

  periodos: Periodo[];
  terms: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public periodosProvider: PeriodosProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeriodosPage');
  }

  ionViewDidEnter() {
    this.periodosProvider.getAll().then(
      (resposta: Periodo[]) => {
        this.periodos = resposta;
      }
    );
  }

  editar(id: number): void {
    this.navCtrl.push(PeriodoPage, {id: id});
  }

  incluir(): void {
    this.navCtrl.push(PeriodoPage);
  }


}
