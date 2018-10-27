import { Component } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';
import { HttpService } from '../../services/http.service';
import { Lote } from '../../model/lote';
import { FileDataDetail } from '../../model/file.data.detail';
import { FileService, EFileTypeService } from '../../services/file.service';

@Component({
    selector: 'page-analytic',
    templateUrl: 'analytic.html'
})
export class AnalyticPage {

    // public lotes: Array<Lote> = [];
    public lote: Lote = new Lote();
    public files: FileDataDetail[] = [];
    // public canExecute: boolean = false;

    constructor(private loadingCtrl: LoadingController, private alertCtrl: AlertController, private httpService: HttpService, private fileService: FileService) {
        this.fileService.createDirectoryIfNotExist('coa');
    }

    ionViewDidLoad() {
        // this.httpService.getLotes().subscribe((lotes: Array<Lote>) => {
        //     this.lotes = lotes;
        //     this.canExecute = true;
        // });
        
        this.fileService.getFileList('coa').then((files: FileDataDetail[]) => {
            this.files = files;
        }).catch(error => {
            this.showAlert('Atención', error, 'Aceptar');
        });
    }

    public generate(evt: Event) {
        const loading = this.loadingCtrl.create({
            content: "Generando el archivo..."
        });
        loading.present();
        this.httpService.generateCOA(this.lote).subscribe((res: any) => {
            if (res.status == 200) {
                loading.setContent('Descargando el archivo...');
                this.fileService.downloadFile(res._body, 'coa/COA.PDF', EFileTypeService.PDF).then((entry: FileDataDetail) => {
                    loading.dismiss();
                    this.files.unshift(entry);
                }).catch(error => {
                    loading.dismiss();
                    this.showAlert('Atención', error, 'Aceptar');
                });
            } else {
                loading.dismiss();
                alert('No se pudo descargar el archivo');
            }
        }, (err: any) => {
            loading.dismiss();
            this.showAlert('Atención', err._body, 'Aceptar');
        });
    }

    public clear(evt: Event) {
        this.lote = new Lote();
    }

    public open(evt: Event, file: FileDataDetail) {
        this.fileService.openFile(file, EFileTypeService.PDF);
    }

    private showAlert(title: string, subTitle: string, textButton: string) {
        const alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: [textButton]
        });
        alert.present();
    }
}