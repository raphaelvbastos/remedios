import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SQLite } from '@ionic-native/sqlite'
import { LocalNotifications } from '@ionic-native/local-notifications';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { PeriodosPage } from '../pages/periodos/periodos';
import { PeriodoPage } from '../pages/periodo/periodo';
import { RemediosPage } from '../pages/remedios/remedios';
import { RemedioPage } from '../pages/remedio/remedio';
import { RemediosPeriodosPage } from '../pages/remedios-periodos/remedios-periodos';
import { RemedioPeriodoPage } from '../pages/remedio-periodo/remedio-periodo';
import { FiltroPipe } from '../pipes/filtro/filtro';
import { FiltroRemediosPipe } from '../pipes/filtro-remedios/filtro-remedios';
import { FiltroPeriodosPipe } from '../pipes/filtro-periodos/filtro-periodos';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseProvider } from '../providers/database/database';
import { PeriodosProvider } from '../providers/periodos/periodos';
import { RemediosProvider } from '../providers/remedios/remedios';
import { RemediosPeriodoProvider } from '../providers/remedios-periodo/remedios-periodo';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    PeriodosPage,
    PeriodoPage,
    RemediosPage,
    RemedioPage,
    RemedioPeriodoPage,
    RemediosPeriodosPage,
    FiltroPipe,
    FiltroRemediosPipe,
    FiltroPeriodosPipe,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    PeriodosPage,
    PeriodoPage,
    RemediosPage,
    RemedioPage,
    RemedioPeriodoPage,
    RemediosPeriodosPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    PeriodosProvider,
    RemediosProvider,
    RemediosPeriodoProvider
  ]
})
export class AppModule {}
