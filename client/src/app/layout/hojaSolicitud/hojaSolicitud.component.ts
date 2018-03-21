import { Recurso } from './../../entidades/CRUD/Recurso';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef, Renderer2, ViewContainerRef } from '@angular/core';

import { LoginResult } from './../../entidades/especifico/Login-Result';
import { Persona } from './../../entidades/CRUD/Persona';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
    selector: 'app-hojaSolicitud',
    templateUrl: './hojaSolicitud.component.html',
    styleUrls: ['./hojaSolicitud.component.scss']
})
export class HojaSolicitudComponent implements OnInit {
    @ViewChild('encabezadoSolicitudMatricula') encabezadoSolicitudMatricula: ElementRef;
    @ViewChild('cuerpoSolicitudMatricula') cuerpoSolicitudMatricula: ElementRef;
    @ViewChild('pieSolicitudMatricula') pieSolicitudMatricula: ElementRef;

    fechaActual: Date;
    solicitante: Persona;
    recursosSolicitados: Recurso[];

    constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private rd: Renderer2) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.fechaActual = new Date();
        const logedResult = JSON.parse(localStorage.getItem('logedResult')) as LoginResult;
        this.getRecursosSolicitados();
        this.solicitante = logedResult.persona;
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

    }
}
