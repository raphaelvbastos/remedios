import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { RemediosPeriodoProvider, RemediosPeriodo } from '../../providers/remedios-periodo/remedios-periodo';
import { Remedio, RemediosProvider } from '../../providers/remedios/remedios';
import { Periodo, PeriodosProvider } from '../../providers/periodos/periodos';

/**
 * Generated class for the RemedioPeriodoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-remedio-periodo',
  templateUrl: 'remedio-periodo.html',
})
export class RemedioPeriodoPage {

  remedioPeriodo: RemediosPeriodo;
  remedios: Remedio[];
  periodos: Periodo[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public remPerPro: RemediosPeriodoProvider, public rp: RemediosProvider, public pp: PeriodosProvider) {
    this.remedioPeriodo = new RemediosPeriodo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemedioPeriodoPage');
  }

  ionViewDidEnter() {
    this.rp.getAll().then(
      (dados: Remedio[]) => {
        this.remedios = dados;
      }
    );

    this.pp.getAll().then(
      (dados: Periodo[]) => {
        this.periodos = dados;
      }
    );
    let id: number = this.navParams.get("id");
    // editar
    if (id && id > 0) {
      this.remPerPro.get(id).then(
        (resposta: RemediosPeriodo) => {
          this.remedioPeriodo = resposta;
        }
      );
    } 
  }

  incluir(): void {
    this.remPerPro.insert(this.remedioPeriodo).then(
      () => {
        this.mensagem("Inclusão");
        this.navCtrl.pop();
      }
    );
  }

  excluir() {
    this.remPerPro.remove(this.remedioPeriodo).then(
      () => {
        this.mensagem("Exclusão");
        this.navCtrl.pop();
      }
    );
  }

  atualizar() {
    this.remPerPro.update(this.remedioPeriodo).then(
      () => {
        this.mensagem("Atualização");
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
