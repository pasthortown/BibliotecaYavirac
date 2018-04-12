import { Recurso } from './../../entidades/CRUD/Recurso';
import { ChartsService } from './charts.service';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
    animations: [routerTransition()]
})
export class ChartsComponent implements OnInit {
    busy: Promise<any>;
    recursos: Recurso[];
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabelsEstados: string[] = [];
    public barChartDataEstados: any[] = [];
    public barChartLabelsTipos: string[] = [];
    public barChartDataTipos: any[] = [];
    public barChartLabelsUnesco: string[] = [];
    public barChartDataUnesco: any[] = [];
    
    // lineChart
    public lineChartData: Array<any> = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
        { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
    ];
    public lineChartLabels: Array<any> = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July'
    ];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors: Array<any> = [
        {
            // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        {
            // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        {
            // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';

    constructor(private chartService: ChartsService) {}

    ngOnInit() {
        this.getTopRecursos();
        this.getEjemplaresCategoriaUnesco();
        this.getEjemplaresEstado();
        this.getEjemplaresTipo();
    }

    getTopRecursos() {
        this.busy = this.chartService.getTopRecursos()
        .then(respuesta => {
            this.recursos = respuesta;
        })
        .catch(error => {
           console.log(error);
        });
    }

    getEjemplaresEstado() {
        this.busy = this.chartService.getEjemplaresEstado()
        .then(respuesta => {
            let etiquetas: string[] = [];
            let datos: number[] = [];
            respuesta.forEach(element => {
                datos.push(element.cuenta);
                etiquetas.push(element.estado);
            });
            this.barChartLabelsEstados = etiquetas;
            this.barChartDataEstados.push({data: datos, label:'Estados'});
        })
        .catch(error => {
           console.log(error);
        });
    }

    getEjemplaresTipo() {
        this.busy = this.chartService.getEjemplaresTipo()
        .then(respuesta => {
            let etiquetas: string[] = [];
            let datos: number[] = [];
            respuesta.forEach(element => {
                datos.push(element.cuenta);
                etiquetas.push(element.tipo);
            });
            this.barChartLabelsTipos = etiquetas;
            this.barChartDataTipos.push({data: datos, label:'Tipos'});
        })
        .catch(error => {
           console.log(error);
        });
    }

    getEjemplaresCategoriaUnesco() {
        this.busy = this.chartService.getEjemplaresCategoriaUnesco()
        .then(respuesta => {
            let etiquetas: string[] = [];
            let datos: number[] = [];
            respuesta.forEach(element => {
                datos.push(element.cuenta);
                etiquetas.push(element.categoria);
            });
            this.barChartLabelsUnesco = etiquetas;
            this.barChartDataUnesco.push({data: datos, label:'Categorias'});
        })
        .catch(error => {
           console.log(error);
        });
    }
}
