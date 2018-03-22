import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public informacion: Array<any> = [];

    constructor() {
        this.informacion.push(
            {
                imagePath: 'assets/images/biblioteca1.jpg',
                label: 'Biblioteca Institucional',
                text:'Tenemos como objetivo facilitar el préstamo de libros para cualquier tipo de tarea.'
            },
            {
                imagePath: 'assets/images/biblioteca2.jpg',
                label: 'Instalaciones',
                text: 'Contamos con una amplia gama de libros tanto en idioma español como en inglés.'
            },
            {
                imagePath: 'assets/images/biblioteca3.jpg',
                label: 'Recursos',
                text:'Disponemos de varios recursos para un mejor aprendizaje en el estudiante.'
            }
        );
    }

    ngOnInit() {}

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
