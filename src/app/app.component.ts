import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { AnalyticPage } from '../pages/analytic/analytic';
import { ReportListPage } from '../pages/report-list/report-list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Listado de Existencia', component: ReportListPage, icon: 'logo-buffer' },
      { title: 'Generar Analítico', component: AnalyticPage, icon: 'md-document' },
      { title: 'Configuración', component: ConfigurationPage, icon: 'md-settings' },
      { title: 'Inicio', component: HomePage, icon: 'md-home' },
      { title: '', component: HomePage, icon: 'md-power'}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
