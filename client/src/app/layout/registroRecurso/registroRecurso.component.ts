import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Productora } from './../../entidades/CRUD/Productora';
import { Autor } from './../../entidades/CRUD/Autor';
import { ModalComponent } from './../bs-component/components';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-registroRecurso',
    templateUrl: './registroRecurso.component.html',
    styleUrls: ['./registroRecurso.component.scss']
})
export class RegistroRecursoComponent implements OnInit {
    entidadSeleccionadaAutor: Autor;
    entidadSeleccionadaProductora: Productora;

    constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private modalService: NgbModal) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.refresh();
    }

    refresh() {
        this.entidadSeleccionadaAutor = new Autor();
        this.entidadSeleccionadaAutor.id = 0;
        this.entidadSeleccionadaProductora = new Productora();
        this.entidadSeleccionadaProductora.id = 0;
    }

    openAutor(content){
        this.modalService.open(content)
        .result
        .then((result => {

        }),(result => {
           //Esto se ejecuta si la ventana se cierra sin aceptar los cambios
        }));
    }

    openProductora(content){
        this.modalService.open(content)
        .result
        .then((result => {

        }),(result => {
           //Esto se ejecuta si la ventana se cierra sin aceptar los cambios
        }));
    }
}
