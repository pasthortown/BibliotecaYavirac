import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from './../../../environments/environment';

import 'rxjs/add/operator/toPromise';

import { Recurso } from './../../entidades/CRUD/Recurso';

@Injectable()

export class GeneradorEtiquetasService {
   private headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
   private urlBase = environment.apiUrl + 'etiquetas';

   constructor(private http: Http) {
   }

   baseUrl(): string {
       return this.urlBase;
   }

   getAll(): Promise<Recurso[]> {
      return this.http.get(this.urlBase+'/leer').toPromise().then(response=>response.json() as Recurso[]).catch(this.handleError);
   }

   handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
   }
}
