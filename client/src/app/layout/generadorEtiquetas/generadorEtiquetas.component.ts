import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import 'rxjs/add/operator/toPromise';
import { ModalComponent } from '../bs-component/components';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { RecursoService } from '../CRUD/recurso/recurso.service';
import { Recurso } from '../../entidades/CRUD/Recurso';
import { GeneradorEtiquetasService } from './generadorEtiquetas.service';

@Component({
    selector: 'app-generadorEtiquetas',
    templateUrl: './generadorEtiquetas.component.html',
    styleUrls: ['./generadorEtiquetas.component.scss']
})
export class GeneradorEtiquetasComponent implements OnInit {

    busy: Promise<any>;
    entidades: Recurso[];
    entidadSeleccionada: Recurso;
    codigo: string;

    constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private dataService: GeneradorEtiquetasService, private modalService: NgbModal) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    getAll(): void {
      this.busy = this.dataService
      .getAll()
      .then(entidadesRecuperadas => {
         this.entidades = entidadesRecuperadas
         if (entidadesRecuperadas == null || entidadesRecuperadas.length === 0) {
            this.toastr.success('¡No hay datos!', 'Consulta');
         } else {
            this.toastr.success('La consulta fue exitosa', 'Consulta');
         }
      })
      .catch(error => {
         this.toastr.success('Se produjo un error', 'Consulta');
      });
   }

   ngOnInit() {
      this.refresh();
      this.codigo = "super bien";
   }

   refresh(): void {
      this.getAll();
   }
}
