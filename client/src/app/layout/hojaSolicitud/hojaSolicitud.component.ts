import { MailData } from './../../entidades/especifico/MailData';
import { MailSenderService } from './../CRUD/externos/mailsender.service';
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

    constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private rd: Renderer2, private solicitudService: SolicitudService, private detalleSolicitudService: DetalleSolicitudService, private mailSender: MailSenderService) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    refresh() {
        this.solicitudActual = new Solicitud();
        this.solicitudActual.fechaSolicitud = new Date();
        const logedResult = JSON.parse(localStorage.getItem('logedResult')) as LoginResult;
        this.solicitante = logedResult.persona;
        this.solicitudActual.idPersona = logedResult.persona.id;
        this.solicitudActual.id = 0;
        this.solicitudActual.Codigo = this.solicitante.identificacion;
        this.solicitudActual.fechaMax = new Date();
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
        this.solicitudActual.fechaDevolucion = new Date('1969-12-31 19:00:00');
        this.busy = this.solicitudService
        .create(this.solicitudActual)
        .then(respuesta => {
            let cuenta = 0;
            this.recursosSolicitados.forEach(recursoSolicitado => {
                let detalleSolicitud = new DetalleSolicitud();
                detalleSolicitud.idRecurso = recursoSolicitado.id;
                detalleSolicitud.idSolicitud = respuesta[0].id;
                this.solicitudActual.Codigo = this.solicitante.identificacion + '-' + respuesta[0].id;
                this.busy = this.detalleSolicitudService
                .create(detalleSolicitud)
                .then(r1 => {
                    cuenta++;
                    if(cuenta == this.recursosSolicitados.length){
                        this.enviarMails();
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

    enviarMails() {
        let mensaje: string;
        let recursos: string;
        this.recursosSolicitados.forEach(recurso => {
            recursos += recurso.Bibliografia + '<br/>';
        });
        mensaje = '<div style="float:left;width:600px;border-radius:5px;border-style:solid;border-width:15px 1px 1px 1px;margin:10px;border-color:#4076ce"><div style="float:left;width:260px;text-align:center;border-radius:5px;border-style:solid;border-width:1px 1px 1px 1px;margin:10px;border-color:white"><img src="https://ci4.googleusercontent.com/proxy/n0C7aY6WrhX-7c6F2zmFp0sqsX4zMZQxbm0PJDDsD2cv2ftIKOd-rU24ksOQoCLzzq92Okbr7ZgVZRcz3VZb6n8Odr0SnFKpxL7vScIPlWd74qNNw_eW=s0-d-e1-ft#http://www.institutobenitojuarez.edu.ec/img/email/logoyavirac.png" alt="" style="width:200px;height:auto;margin:10px"><h5>SOLICITUD DE RECURSOS DE BIBLITECA</h5><h3>#nombre1 #nombre2 #apellido1 #apellido2</h3></div><div style="float:right;width:260px;border-radius:5px;border-style:solid;border-width:1px 1px 1px 1px;margin-top:10px;margin-bottom:10px;margin-right:10px;border-color:white;font-size:10px"><div style="margin-top:10px;text-indent:10px;float:left;width:260px;border-radius:5px 5px 0px 0px;border-style:solid;border-color:#4076ce;background-color:#4076ce;color:white;font-size:10px;font-family:"Lucida Sans","Lucida Sans Regular","Lucida Grande","Lucida Sans Unicode",Geneva,Verdana,sans-serif">Código:</div><div style="text-indent:10px;float:left;width:260px;border-radius:0px 0px 5px 5px;border-style:solid;background-color:white;color:black;border-color:#4076ce;font-size:10px;font-family:"Lucida Sans","Lucida Sans Regular","Lucida Grande","Lucida Sans Unicode",Geneva,Verdana,sans-serif;padding-top:10px;padding-bottom:10px"><h3>#codigo</h3></div><div style="margin-top:10px;text-indent:10px;float:left;width:260px;border-radius:5px 5px 0px 0px;border-style:solid;border-color:#4076ce;background-color:#4076ce;color:white;font-size:10px;font-family:"Lucida Sans","Lucida Sans Regular","Lucida Grande","Lucida Sans Unicode",Geneva,Verdana,sans-serif">Recursos:</div><div style="text-indent:10px;float:left;width:260px;border-radius:0px 0px 5px 5px;border-style:solid;background-color:white;color:black;border-color:#4076ce;font-size:10px;font-family:"Lucida Sans","Lucida Sans Regular","Lucida Grande","Lucida Sans Unicode",Geneva,Verdana,sans-serif;padding-top:10px;padding-bottom:10px">#recursos</div><div style="margin-top:10px;text-indent:10px;float:left;width:260px;border-radius:5px 5px 0px 0px;border-style:solid;border-color:#4076ce;background-color:#4076ce;color:white;font-size:10px;font-family:"Lucida Sans","Lucida Sans Regular","Lucida Grande","Lucida Sans Unicode",Geneva,Verdana,sans-serif">Fecha Límite de Devolución:</div><div style="text-indent:10px;float:left;width:260px;border-radius:0px 0px 5px 5px;border-style:solid;background-color:white;color:black;border-color:#4076ce;font-size:10px;font-family:"Lucida Sans","Lucida Sans Regular","Lucida Grande","Lucida Sans Unicode",Geneva,Verdana,sans-serif;padding-top:10px;padding-bottom:10px">#fechaDevolucion</div></div></div>';
        let mailToEstudiante: MailData;
        mailToEstudiante = new MailData();
        mailToEstudiante.ToAlias = this.solicitante.nombre1 + ' ' + this.solicitante.nombre2 + ' ' + this.solicitante.apellido1 + ' ' + this.solicitante.apellido2;
        mensaje = mensaje.replace('#solicitante', mailToEstudiante.ToAlias);
        mensaje = mensaje.replace('#codigo', this.solicitudActual.Codigo);
        mensaje = mensaje.replace('#recursos', recursos);
        mensaje = mensaje.replace('#fechaDevolucion', this.solicitudActual.fechaMax.toLocaleString());
        mailToEstudiante.FromAlias = 'BIBLIOTECA YAVIRAC';
        mailToEstudiante.FromClave = '1234Biblioteca*';
        mailToEstudiante.FromEmail = 'biblioteca@yavirac.edu.ec';
        mailToEstudiante.ReplyAlias = 'BIBLIOTECA YAVIRAC';
        mailToEstudiante.ReplyEmail = 'biblioteca@yavirac.edu.ec';
        mailToEstudiante.ToEmail = this.solicitante.correoElectronicoInstitucional;
        mailToEstudiante.Asunto = 'SOLCITITUD DE BIBLIOTECA ' + this.solicitudActual.Codigo;
        let mailToBiblioteca: MailData;
        mailToBiblioteca = new MailData();
        mailToBiblioteca.FromAlias = 'BIBLIOTECA YAVIRAC';
        mailToBiblioteca.FromClave = '1234Biblioteca*';
        mailToBiblioteca.FromEmail = 'biblioteca@yavirac.edu.ec';
        mailToBiblioteca.ReplyAlias = 'BIBLIOTECA YAVIRAC';
        mailToBiblioteca.ReplyEmail = 'biblioteca@yavirac.edu.ec';
        mailToBiblioteca.ToAlias = 'BIBLIOTECA YAVIRAC';
        mailToBiblioteca.ToEmail = 'biblioteca@yavirac.edu.ec';
        mailToBiblioteca.Asunto = 'SOLCITITUD DE BIBLIOTECA ' + this.solicitudActual.Codigo;
        mailToBiblioteca.Mensaje = mensaje;
        mailToEstudiante.Mensaje = mensaje;
        this.busy = this.mailSender
        .sendMail(mailToBiblioteca)
        .then(respuesta => {

        })
        .catch(error => {

        });
        this.busy = this.mailSender
        .sendMail(mailToEstudiante)
        .then(respuesta => {

        })
        .catch(error => {

        });
    }
}
