import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/toPromise';

@Injectable()

export class ChartsService {
   private headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
   private urlBase = environment.apiUrl + 'estadisticas';

   constructor(private http: Http) {
   }

   getEstadisticas(): Promise<any[]> {
      return this.http.get(this.urlBase+'/obtener').toPromise().then(response=>response.json() as any[]).catch(this.handleError);
   }

   baseUrl(): string {
       return this.urlBase;
   }

   handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
   }
}
