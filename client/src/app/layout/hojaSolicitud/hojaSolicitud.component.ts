import { DetalleSolicitudService } from './../CRUD/detallesolicitud/detallesolicitud.service';
import { DetalleSolicitud } from './../../entidades/CRUD/DetalleSolicitud';
import { Solicitud } from './../../entidades/CRUD/Solicitud';
import { Recurso } from './../../entidades/CRUD/Recurso';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef, Renderer2, ViewContainerRef } from '@angular/core';

import { LoginResult } from './../../entidades/especifico/Login-Result';
import { Persona } from './../../entidades/CRUD/Persona';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { SolicitudService } from '../CRUD/solicitud/solicitud.service';

@Component({
    selector: 'app-hojaSolicitud',
    templateUrl: './hojaSolicitud.component.html',
    styleUrls: ['./hojaSolicitud.component.scss']
})
export class HojaSolicitudComponent implements OnInit {
    @ViewChild('encabezadoSolicitudMatricula') encabezadoSolicitudMatricula: ElementRef;
    @ViewChild('cuerpoSolicitudMatricula') cuerpoSolicitudMatricula: ElementRef;
    @ViewChild('pieSolicitudMatricula') pieSolicitudMatricula: ElementRef;

    busy: Promise<any>;
    fechaActual: Date;
    solicitante: Persona;
    recursosSolicitados: Recurso[];
    solicitudActual: Solicitud;
    codigo: string;

    constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private rd: Renderer2, private solicitudService: SolicitudService, private detalleSolicitudService: DetalleSolicitudService) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    refresh() {
        this.solicitudActual = new Solicitud();
        this.solicitudActual.fechaSolicitud = new Date();
        const logedResult = JSON.parse(localStorage.getItem('logedResult')) as LoginResult;
        this.solicitante = logedResult.persona;
        this.solicitudActual.idPersona = logedResult.persona.id;
        this.solicitudActual.id = 0;
        this.solicitudActual.fechaMax = new Date();
        this.codigo = this.solicitudActual.fechaSolicitud.getFullYear().toString() + '-' + (this.solicitudActual.fechaSolicitud.getMonth() +1).toString() + '-' + this.solicitudActual.id;
        let nuevaFecha: Date = new Date();
        nuevaFecha.setDate(nuevaFecha.getDate()+3);
        if (nuevaFecha.getDay()==0) {
            nuevaFecha.setDate(nuevaFecha.getDate()+1);
        }
        if (nuevaFecha.getDay()==6) {
            nuevaFecha.setDate(nuevaFecha.getDate()+2);
        }
        this.solicitudActual.fechaMax = nuevaFecha;
        this.getRecursosSolicitados();
    }

    ngOnInit() {
        this.refresh();
    }

    getRecursosSolicitados() {
        if(localStorage.getItem('recursosSolicitados') == 'undefined') {
            this.recursosSolicitados = [];
        } else {
            this.recursosSolicitados = JSON.parse(localStorage.getItem('recursosSolicitados')) as Recurso[];
        }
    }

    retirar(id: number) {
        let newRecursos: Recurso[] = [];
        this.recursosSolicitados.forEach(recurso => {
            if(recurso.id != id) {
                newRecursos.push(recurso);
            }
        });
        localStorage.setItem('recursosSolicitados', JSON.stringify(newRecursos));
        this.getRecursosSolicitados();
    }

    bibliografia(): void {
        let bibliografia: string = '';
        this.recursosSolicitados.forEach(recursoSolicitado => {
            let recursoSolicitadoABibliografia: string = '';
            recursoSolicitadoABibliografia = recursoSolicitado.Bibliografia;
            bibliografia += recursoSolicitadoABibliografia;
        });
        alert(bibliografia);
    }

    imprimir(): void {
        html2canvas(this.encabezadoSolicitudMatricula.nativeElement).then(canvasEncabezado => {
            const encabezadoSolicitudMatriculaImg = canvasEncabezado.toDataURL('image/png');
            html2canvas(this.cuerpoSolicitudMatricula.nativeElement).then(canvasCuerpo => {
                const cuerpoSolicitudMatriculaImg = canvasCuerpo.toDataURL('image/png');
                html2canvas(this.pieSolicitudMatricula.nativeElement).then(canvasPie => {
                    const pieSolicitudMatriculaImg = canvasPie.toDataURL('image/png');
                    const doc = new jsPDF();
                    doc.addImage(encabezadoSolicitudMatriculaImg, 'PNG', 10, 10, 190, 30);
                    doc.addImage(cuerpoSolicitudMatriculaImg, 'PNG', 30, 40, 160, 217);
                    doc.addImage(pieSolicitudMatriculaImg, 'PNG', 10, 257, 190, 30);
                    doc.save('SolicitudBiblioteca' + this.solicitante.identificacion + '.pdf');
                });
            });
        });
    }

    aceptar(): void {
        if(this.recursosSolicitados.length == 0){
            this.toastr.warning('No hay recursos solicitados.', 'Solicitud');
            return;
        }
        this.busy = this.solicitudService
        .create(this.solicitudActual)
        .then(respuesta => {
            let cuenta = 0;
            this.recursosSolicitados.forEach(recursoSolicitado => {
                let detalleSolicitud = new DetalleSolicitud();
                detalleSolicitud.idRecurso = recursoSolicitado.id;
                detalleSolicitud.idSolicitud = respuesta[0].id;
                this.busy = this.detalleSolicitudService
                .create(detalleSolicitud)
                .then(r1 => {
                    cuenta++;
                    if(cuenta == this.recursosSolicitados.length){
                        this.toastr.success('Solicitud Receptada Satisfactoriamente.', 'Solicitud');
                        this.recursosSolicitados = [];
                        localStorage.setItem('recursosSolicitados', JSON.stringify(this.recursosSolicitados));
                        this.refresh();
                    }
                })
                .catch(error => {

                });
            });
        })
        .catch(error => {

        });
    }
}
