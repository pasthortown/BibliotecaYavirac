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
    public bibliotecas: Array<any> = [];

    constructor() {
        this.bibliotecas.push(
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

        /*this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );*/
    }

    ngOnInit() {}

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
