import { Recurso } from './../../entidades/CRUD/Recurso';
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

    getTopRecursos(): Promise<Recurso[]> {
        return this.http.get(this.urlBase+'/top_10_recursos').toPromise().then(response=>response.json() as Recurso[]).catch(this.handleError);
    }

    getEjemplaresTipo(): Promise<any[]> {
        return this.http.get(this.urlBase+'/ejemplares_tipo').toPromise().then(response=>response.json() as any[]).catch(this.handleError);
    }

    getEjemplaresEstado(): Promise<any[]> {
        return this.http.get(this.urlBase+'/ejemplares_por_estado').toPromise().then(response=>response.json() as any[]).catch(this.handleError);
    }

    getEjemplaresCategoriaUnesco(): Promise<any[]> {
        return this.http.get(this.urlBase+'/ejemplares_categoria_unesco').toPromise().then(response=>response.json() as any[]).catch(this.handleError);
    }

    baseUrl(): string {
        return this.urlBase;
    }

    handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
