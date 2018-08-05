import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Remedio, RemediosProvider } from '../../providers/remedios/remedios';

/**
 * Generated class for the RemedioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-remedio',
  templateUrl: 'remedio.html',
})
export class RemedioPage {

  remedio: Remedio;
  constructor(public navCtrl: NavController, public navParams: NavParams, public remediosProvider: RemediosProvider, public alertCtrl: AlertController) {
    this.remedio = new Remedio();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemedioPage');
  }

  ionViewDidEnter() {
    let id: number = this.navParams.get("id");
    // editar
    if (id && id > 0) {
      this.remediosProvider.get(id).then(
        (resposta: Remedio) => {
          this.remedio = resposta;
        }
      );
    } 
  }

  incluir(): void {
    this.remediosProvider.insert(this.remedio).then(
      () => {
        this.mensagem("Inclusão");
        this.navCtrl.pop();
      }
    );
  }

  atualizar(): void {
    this.remediosProvider.update(this.remedio).then(
      () => {
        this.mensagem("Atualização");
        this.navCtrl.pop();
      }
    );
  }

  excluir(): void {
    this.remediosProvider.remove(this.remedio.id).then(
      () => {
        this.mensagem("Exclusão");
        this.navCtrl.pop();
      }
    );
  }

  mensagem(operacao: string): void {
    const alert = this.alertCtrl.create({
      title: 'Operação finalizada',
      subTitle: operacao + ' realizada com sucesso!',
      buttons: ['OK']
    });
    alert.present();
  }

}
