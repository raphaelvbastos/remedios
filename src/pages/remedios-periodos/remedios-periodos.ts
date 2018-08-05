import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { RemediosPeriodoProvider, RemediosPeriodo } from '../../providers/remedios-periodo/remedios-periodo';
import { RemedioPeriodoPage } from '../../pages/remedio-periodo/remedio-periodo'
import { PeriodosProvider, Periodo } from '../../providers/periodos/periodos';
/**
 * Generated class for the RemediosPeriodosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-remedios-periodos',
  templateUrl: 'remedios-periodos.html',
})
export class RemediosPeriodosPage {

  lista: any[];
  periodos: Periodo[];
  remediosPeriodos: RemediosPeriodo[];
  filtroPeriodo: any;
  // teste: any[];
  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public navParams: NavParams, public rpProvider: RemediosPeriodoProvider, public periodosProvider: PeriodosProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemediosPeriodosPage');
  }

  ionViewDidEnter() {
    this.rpProvider.getAllPorPeriodo().then(
      (dados: any[]) => this.lista = dados
      //(dados: RemediosPeriodo[]) => this.remediosPeriodos = dados
    ).catch(
      (e) => console.error("Erro lista", JSON.stringify(e))
    );

    this.periodosProvider.getAll()
      .then( (dados: Periodo[]) => {
        this.periodos = dados;
      } )
      .catch();

    // this.rpProvider.getRemedios(3).then(
    //   (dados: any[]) => {
    //     this.teste = dados;
    //     console.log(dados);
    //   }
    // );

    // this.rpProvider.getAllPorPeriodo(null, 1).then(
    //   (dados: any[]) => this.teste = dados
    //   //(dados: RemediosPeriodo[]) => this.remediosPeriodos = dados
    // ).catch(
    //   (e) => console.error("Erro lista", JSON.stringify(e))
    // );
    
  }

  incluir(): void {
    this.navCtrl.push(RemedioPeriodoPage);
  }

  editar(id: number): void {
    this.navCtrl.push(RemedioPeriodoPage, {id: id});
  }

  filtroTodas(): void {
    this.filtroPeriodo = null;
    this.menuCtrl.close();
  }

  filtroPeriodos(p: string): void {
    this.filtroPeriodo = {periodo: p};
    this.menuCtrl.close();
  }
}
