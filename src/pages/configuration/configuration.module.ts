import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfigurationPage } from './configuration';
import { SecureStorage } from '@ionic-native/secure-storage';

@NgModule({
  declarations: [
    ConfigurationPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfigurationPage),
  ],
  providers: [SecureStorage]
})
export class ConfigurationPageModule {}
