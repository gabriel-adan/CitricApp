import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ServerConfig } from '../model/server.config';
import { StoreService } from './store.service';
import { Lote } from '../model/lote';
import { ReportListModel } from '../model/report.list.model';
import { Deposit } from '../model/deposit';

@Injectable()
export class HttpService {
    
    private URL = 'api';
    public serverConfig: ServerConfig;

    constructor(private http: Http, private authHttp: AuthHttp, private storeService: StoreService) {
        this.serverConfig = storeService.getServerConfig();
        this.URL = 'http://' + this.serverConfig.ip + ':' + this.serverConfig.port + '/citricapi/public/v1';
    }

    public getLotes(): Observable<Array<Lote>> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = new RequestOptions({ headers: headers });
        return this.authHttp.get(this.URL + '/lotes', options)
            .map((res: Response) => res.json())
            .catch((err: Response) => Observable.throw(err || 'Server Error'));
    }

    public generateCOA(lote: Lote): Observable<Response> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = new RequestOptions({ headers: headers });
        return this.authHttp.post(this.URL + '/coa', {
            lote: lote.Lote
        }, options).map((res: Response) => res)
            .catch((error: Response) => Observable.throw(error || 'Server error'));
    }

    public getDeposits(): Observable<Array<Deposit>> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = new RequestOptions({ headers: headers });
        return this.authHttp.get(this.URL + '/depositos', options)
            .map((res: Response) => res.json())
            .catch((err: Response) => Observable.throw(err || 'Server Error'));
    }

    public generateReportList(reportModel: ReportListModel): Observable<Response> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = new RequestOptions({ headers: headers });
        return this.authHttp.post(this.URL + '/listado', {
            lote_desde: reportModel.fromLote,
            lote_hasta: reportModel.toLote,
            deposito_desde: reportModel.fromDeposit,
            deposito_hasta: reportModel.toDeposit,
            fecha_desde: reportModel.fromDate,
            fecha_hasta: reportModel.toDate
        }, options).map((res: Response) => res)
            .catch((error: Response) => Observable.throw(error || 'Server error'));
    }

    public logIn(username: string, password: string): Observable<Response> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.URL + '/loginOnFile', {
            username: username,
            password: password
        }, options).map((res: Response) => res.json())
            .catch((error: Response) => Observable.throw(error || 'Server error'));
    }
}