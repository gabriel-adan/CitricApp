import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpService } from '../../services/http.service';
import { HomePage } from '../home/home';
import { StoreService } from '../../services/store.service';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    public username: string = '';
    public password: string = '';

    constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private httpService: HttpService, private storeService: StoreService) {
    }

    ionViewDidLoad() {
      
    }

    public login(evt) {
        const loading = this.loadingCtrl.create({
            content: "Iniciando sesion..."
        });
        loading.present();
        this.httpService.logIn(this.username, this.password).subscribe((res: any) => {
            loading.dismiss();
            if (res.access_token) {
                this.storeService.setToken(res.access_token);
                this.navCtrl.setRoot(HomePage);
            } else {
                alert("Ocurrió un error");
            }
        }, (error) => {
            loading.dismiss().then((value: any) => {
                alert("Usuario o contraseña inválido.");
            }).catch((err) => {
                
            });
        });
    }
}
