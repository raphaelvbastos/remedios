import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RemediosProvider, Remedio } from '../../providers/remedios/remedios';
import { RemedioPage } from '../remedio/remedio';

@Component({
  selector: 'page-remedios',
  templateUrl: 'remedios.html',
})
export class RemediosPage {
  remedios: Remedio[];
  terms: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public remediosProvider: RemediosProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemediosPage');
  }

  ionViewDidEnter() {
    this.remediosProvider.getAll().then(
      (dados: Remedio[]) => {
        this.remedios = dados;
      }
    )
  }

  incluir(): void {
    this.navCtrl.push(RemedioPage);
  }

  editar(id: number): void {
    this.navCtrl.push(RemedioPage, {id: id});
  }

}
