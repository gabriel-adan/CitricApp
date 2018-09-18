import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServerConfig } from '../../model/server.config';
import { StoreService } from '../../services/store.service';

@IonicPage()
@Component({
    selector: 'page-configuration',
    templateUrl: 'configuration.html'
})
export class ConfigurationPage {

    public config: ServerConfig = new ServerConfig();

    constructor(public navCtrl: NavController, public navParams: NavParams, private storeService: StoreService) {
        
    }

    ionViewDidLoad() {
        this.config = this.storeService.getServerConfig();
    }

    public saveConfiguration(evt: Event) {
        this.storeService.saveServerConfig(this.config);
    }
}
