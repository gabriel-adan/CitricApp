import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { AnalyticPage } from '../pages/analytic/analytic';
import { ReportListPage } from '../pages/report-list/report-list';
import { LoginPage } from '../pages/login/login';
import { JwtHelper } from 'angular2-jwt';
import { StoreService } from '../services/store.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;

    jwtHelper: JwtHelper = new JwtHelper();

    AUTHENTICATED_MENU = 'authenticated';
    UNAUTHENTICATED_MENU = 'unauthenticated';

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public menuCtrl: MenuController, private storeService: StoreService) {
      this.initializeApp();
      const token = this.storeService.getToken();
      try {
        if (token && this.jwtHelper.decodeToken(token)) {
          if (token) {
              this.menuCtrl.enable(true, this.AUTHENTICATED_MENU);
              this.menuCtrl.enable(false, this.UNAUTHENTICATED_MENU);
          } else {
              this.menuCtrl.enable(false, this.AUTHENTICATED_MENU);
              this.menuCtrl.enable(true, this.UNAUTHENTICATED_MENU);
          }
        }
      } catch(ex) {

      }
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

    openReportList(evt) {
      this.nav.setRoot(ReportListPage);
    }

    openAnalytic(evt) {
      this.nav.setRoot(AnalyticPage);
    }

    openHome(evt) {
      this.nav.setRoot(HomePage);
    }

    openConfiguration(evt) {
      this.nav.setRoot(ConfigurationPage);
    }

    openLoginPage(evt) {
      this.nav.setRoot(LoginPage);
    }

    closeSesion(evt) {
      this.storeService.removeToken();
      this.nav.setRoot(HomePage);
    }
}
