import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { PeriodosProvider, Periodo } from '../../providers/periodos/periodos';

/**
 * Generated class for the PeriodoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-periodo',
  templateUrl: 'periodo.html',
})
export class PeriodoPage {

  periodo: Periodo;

  constructor(public navCtrl: NavController, public navParams: NavParams, public periodosProvider: PeriodosProvider, public alertCtrl: AlertController) {
    this.periodo = new Periodo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeriodoPage');
  }

  ionViewDidEnter() {
    let id: number = this.navParams.get("id");
    // editar
    if (id && id > 0) {
      this.periodosProvider.get(id).then(
        (resposta: Periodo) => {
          this.periodo = resposta;
        }
      );
    } 
  }

  atualizar(): void {
    this.periodosProvider.update(this.periodo).then(
      () => {
        this.mensagem("Atualização");
        this.navCtrl.pop();
      }
    );
  }

  incluir(): void {
    this.periodosProvider.insert(this.periodo).then(
      () => {
        this.mensagem("Inclusão");
        this.navCtrl.pop();
      }
    );
  }

  excluir(): void {
    this.periodosProvider.remove(this.periodo.id).then(
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
