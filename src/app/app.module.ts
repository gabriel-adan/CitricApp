import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConfigurationPageModule } from '../pages/configuration/configuration.module';
import { HttpService } from '../services/http.service';
import { AnalyticPage } from '../pages/analytic/analytic';
import { StoreService } from '../services/store.service';
import { ReportListPage } from '../pages/report-list/report-list';
import { FileSizeFormatPipe } from '../pipes/file-size-format/file-size-format';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FileService } from '../services/file.service';
import { File } from '@ionic-native/file';
import { DocumentViewer } from '@ionic-native/document-viewer';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http } from '@angular/http';
import { LoginPage } from '../pages/login/login';

let storage = new StoreService();

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'access_token',
    headerPrefix: 'Bearer',
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.getToken()),
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AnalyticPage,
    ReportListPage,
    LoginPage,
    FileSizeFormatPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ConfigurationPageModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AnalyticPage,
    ReportListPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpService, StoreService, FileTransfer, FileService, File, DocumentViewer,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    }
  ]
})
export class AppModule {}
