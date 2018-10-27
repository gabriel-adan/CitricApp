import { Component } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';
import { Lote } from '../../model/lote';
import { HttpService } from '../../services/http.service';
import { ReportListModel } from '../../model/report.list.model';
import { Deposit } from '../../model/deposit';
import { EFileTypeService, FileService } from '../../services/file.service';
import { FileDataDetail } from '../../model/file.data.detail';

@Component({
    selector: 'page-report-list',
    templateUrl: 'report-list.html'
})
export class ReportListPage {

    // public lotes: Array<Lote> = [];
    public model: ReportListModel = new ReportListModel();
    public files: FileDataDetail[] = [];
    public deposits = [];
    
    constructor(private loadingCtrl: LoadingController, private alertCtrl: AlertController, private httpService: HttpService, private fileService: FileService) {
        this.fileService.createDirectoryIfNotExist('listado');
    }

    ionViewDidLoad() {
        // this.httpService.getLotes().subscribe((lotes: Array<Lote>) => {
        //     this.lotes = lotes;
        // });
        
        this.httpService.getDeposits().subscribe((deposits: Array<Deposit>) => {
            this.deposits = deposits;
        }, (error) => {
            alert(error);
        });

        this.fileService.getFileList('listado').then((files: FileDataDetail[]) => {
            this.files = files;
        }).catch(error => {
            this.showAlert('Atención', error, 'Aceptar');
        });
    }

    public generate(evt: Event) {
        const loading = this.loadingCtrl.create({
            content: "Generando el archivo"
        });
        loading.present();
        this.httpService.generateReportList(this.model).subscribe((res: any) => {
            if (res.status == 200) {
                loading.setContent('Descargando el archivo...');
                this.fileService.downloadFile(res._body, 'listado/LISTADO.PDF', EFileTypeService.PDF).then((entry: FileDataDetail) => {
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
        this.model = new ReportListModel();
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
