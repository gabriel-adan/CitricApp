import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { StoreService } from '../../services/store.service';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    AUTHENTICATED_MENU = 'authenticated';
    UNAUTHENTICATED_MENU = 'unauthenticated';
    
    constructor(public navCtrl: NavController, public menuCtrl: MenuController, private storeService: StoreService) {

    }

    ionViewDidLoad() {
        const token = this.storeService.getToken();
        if (token) {
            this.menuCtrl.enable(true, this.AUTHENTICATED_MENU);
            this.menuCtrl.enable(false, this.UNAUTHENTICATED_MENU);
        } else {
            this.menuCtrl.enable(false, this.AUTHENTICATED_MENU);
            this.menuCtrl.enable(true, this.UNAUTHENTICATED_MENU);
        }
    }
}
