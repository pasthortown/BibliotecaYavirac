import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { } from '@types/googlemaps';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    @ViewChild('gmap') gmapElement: any;
    public alerts: Array<any> = [];
    public informacion: Array<any> = [];
    map: google.maps.Map;
    latitude: any;
    longitude: any;

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

    ngOnInit() {
        const mapProp = {
            center: new google.maps.LatLng(-0.224710, -78.516763),
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
        let location = new google.maps.LatLng(-0.224710, -78.516763);
        let marker = new google.maps.Marker({
          position: location,
          map: this.map,
          title: 'YAVIRAC'
        });
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

    setCenter() {
        this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));

        let location = new google.maps.LatLng(this.latitude, this.longitude);

        let marker = new google.maps.Marker({
          position: location,
          map: this.map,
          title: 'Got you!'
        });
      }
}
