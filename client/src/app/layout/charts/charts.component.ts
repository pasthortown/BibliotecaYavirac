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
    month: string;
    year: number;
    hoy = new Date();
    meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
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
    public lineChartData: Array<any> = [];
    public lineChartLabels: Array<any> = [];
    public lineChartDataMes: Array<any> = [];
    public lineChartLabelsMes: Array<any> = [];
    public lineChartOptions: any = {
        responsive: true
    };
    public BarChartColors: Array<any> = [{
        backgroundColor: '#3bb55a',
        borderColor: '#27332a'
    }];
    public lineChartColors: Array<any> = [
        {
            backgroundColor: '#e3eaed',
            borderColor: '#27b0ea',
            pointBackgroundColor: '#f7370c',
            pointBorderColor: '#6d4035',
            pointHoverBackgroundColor: '#84ff0a',
            pointHoverBorderColor: '#356d39'
        }
    ];

    constructor(private chartService: ChartsService) {}

    ngOnInit() {
        this.getTopRecursos();
        this.getEjemplaresCategoriaUnesco();
        this.getEjemplaresEstado();
        this.getEjemplaresTipo();
        this.getUsoBiblioteca();
        this.getUsoBibliotecaEsteMes();
        this.year = this.hoy.getFullYear();
        this.month = this.meses[this.hoy.getMonth()];
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
            this.barChartDataUnesco.push({data: datos, label:'Recursos'});
        })
        .catch(error => {
           console.log(error);
        });
    }

    getUsoBiblioteca() {
        this.busy = this.chartService.getUsoBiblioteca()
        .then(respuesta => {
            let etiquetas: string[] = [];
            let datos: number[] = [];
            respuesta.forEach(element => {
                datos.push(element.cuenta);
                etiquetas.push(this.meses[Number(element.fecha) - 1]);
            });
            console.log(datos);
            console.log(etiquetas);
            this.lineChartData.push({data: datos, label:'Solicitudes'});
            this.lineChartLabels = etiquetas;
        })
        .catch(error => {
           console.log(error);
        });
    }

    getUsoBibliotecaEsteMes() {
        this.busy = this.chartService.getUsoBibliotecaEsteMes()
        .then(respuesta => {
            let etiquetas: string[] = [];
            let datos: number[] = [];
            respuesta.forEach(element => {
                datos.push(element.cuenta);
                etiquetas.push(element.fecha);
            });
            console.log(datos);
            console.log(etiquetas);
            this.lineChartDataMes.push({data: datos, label:'Solicitudes'});
            this.lineChartLabelsMes = etiquetas;
        })
        .catch(error => {
           console.log(error);
        });
    }
}
