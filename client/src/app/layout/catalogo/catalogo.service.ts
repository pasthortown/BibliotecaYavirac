import { Tag } from './../../entidades/CRUD/Tag';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/toPromise';

@Injectable()

export class CatalogoService {
   private headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
   private urlBase = environment.apiUrl + 'recurso_tags';

   constructor(private http: Http) {
   }

   getTags(id: number): Promise<Tag[]> {
      return this.http.get(this.urlBase+'/obtener_tags' + '?id=' + id.toString()).toPromise().then(response=>response.json() as Tag[]).catch(this.handleError);
   }

   baseUrl(): string {
       return this.urlBase;
   }

   handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
   }
}
