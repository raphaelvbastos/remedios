import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BotoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'botoes',
  templateUrl: 'botoes.html',
})
export class BotoesPage {
  btnIncluir: any;
  btnAtualizar: any;
  btnExcluir: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.btnIncluir = {esconder: true};
    this.btnAtualizar = {esconder: true};
    this.btnExcluir = {esconder: true};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BotoesPage');
  }

}
