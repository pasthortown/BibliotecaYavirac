import { PersonaService } from './../CRUD/externos/persona.service';
import { RecursoService } from './../CRUD/recurso/recurso.service';
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
    selector: 'app-gestionSolicitudes',
    templateUrl: './gestionSolicitudes.component.html',
    styleUrls: ['./gestionSolicitudes.component.scss']
})
export class GestionSolicitudesComponent implements OnInit {
    @ViewChild('encabezadoSolicitudMatricula') encabezadoSolicitudMatricula: ElementRef;
    @ViewChild('cuerpoSolicitudMatricula') cuerpoSolicitudMatricula: ElementRef;
    @ViewChild('pieSolicitudMatricula') pieSolicitudMatricula: ElementRef;

    busy: Promise<any>;
    fechaActual: Date;
    solicitante: Persona;
    solicitudes: Solicitud[];
    recursosSolicitados: Recurso[];
    solicitudActual: Solicitud;
    codigo: string;
    idSolicitudSeleccionada: number;

    constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private rd: Renderer2, private solicitudService: SolicitudService, private detalleSolicitudService: DetalleSolicitudService, private recursoService: RecursoService, private personaService: PersonaService) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    refresh() {
        this.solicitudActual = new Solicitud();
        this.solicitante = new Persona();
        this.getSolicitudes()
        this.idSolicitudSeleccionada = 0;
    }

    ngOnInit() {
        this.refresh();
    }

    seleccionadoSolicitud() {
        if(this.idSolicitudSeleccionada == 0){
            return;
        }
        this.solicitudes.forEach(solicitud => {
            if(solicitud.id == this.idSolicitudSeleccionada){
                this.solicitudActual = solicitud;
                this.getRecursosSolicitados();
                this.getSolicitante();
            }
        });
    }

    getSolicitudes() {
        this.solicitudes=[];
        this.busy = this.solicitudService
        .getAll()
        .then(respuesta => {
            if ( JSON.stringify(respuesta) == '[0]' ) {
                return;
            }
            this.solicitudes = respuesta;
        })
        .catch(error => {

        });
    }

    getRecursosSolicitados() {
        this.recursosSolicitados=[];
        this.busy = this.detalleSolicitudService
        .getFiltrado('idSolicitud','coincide',this.solicitudActual.id.toString())
        .then(detallesSolicitud => {
            detallesSolicitud.forEach(detalle => {
                this.busy = this.recursoService
                .get(detalle.idRecurso)
                .then(respuesta => {
                    this.recursosSolicitados.push(respuesta);
                })
                .catch(error => {

                });
            });
        })
        .catch(error => {

        });
    }

    getSolicitante() {
        this.busy = this.personaService
        .get(this.solicitudActual.idPersona)
        .then(respuesta => {
            this.solicitante = respuesta;
        })
        .catch(error => {

        });
    }

    retirar(id: number) {
        let newRecursos: Recurso[] = [];
        this.recursosSolicitados.forEach(recurso => {
            if(recurso.id != id) {
                newRecursos.push(recurso);
            }
        });
        this.recursosSolicitados = newRecursos;
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
        this.busy = this.detalleSolicitudService
        .getFiltrado('idSolicitud','coincide',this.solicitudActual.id.toString())
        .then(respuesta => {
            respuesta.forEach(element => {
                this.busy = this.detalleSolicitudService
                .remove(element.id)
                .then(respuesta => {

                })
                .catch(error => {

                });
            });
        })
        .catch(error => {

        });
        let cuenta = 0;
        this.recursosSolicitados.forEach(recursoSolicitado => {
            let detalleSolicitud = new DetalleSolicitud();
            detalleSolicitud.idRecurso = recursoSolicitado.id;
            detalleSolicitud.idSolicitud = this.solicitudActual.id;
            this.busy = this.detalleSolicitudService
            .create(detalleSolicitud)
            .then(respuesta => {
                cuenta++;
                if(cuenta == this.recursosSolicitados.length){
                    this.toastr.success('Solicitud Actualizada Satisfactoriamente.', 'Solicitud');
                    this.refresh();
                }
            })
            .catch(error => {

            });
        });
    }
}
