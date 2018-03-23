import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from './../../../../environments/environment';

import 'rxjs/add/operator/toPromise';
import { DestinoMail } from '../../../entidades/especifico/DestinoMail';

@Injectable()

export class MailSenderService {
    private headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    private urlBase = environment.apiUrl;

    constructor(private http: Http) {
    }

    cuentaEnvios(): Promise<number> {
        const url = `${this.urlBase + 'mail_sender/cuentaEnvios'}`;
        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as number)
        .catch(this.handleError);
    }

    sendMail(MailData): Promise<any[]> {
        const url = `${this.urlBase + 'mail_sender/enviar'}`;
        return this.http.post(url, JSON.stringify(MailData))
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    baseUrl(): string {
        return this.urlBase;
    }

    handleError(error: any): Promise<any> {
       console.error('An error occurred', error); // for demo purposes only
       return Promise.reject(error.message || error);
    }
}
