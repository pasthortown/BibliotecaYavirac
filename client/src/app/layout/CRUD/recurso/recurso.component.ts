import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Recurso } from '../../../entidades/CRUD/Recurso';
import { RecursoService } from './recurso.service';

import 'rxjs/add/operator/toPromise';
import { ModalComponent } from '../../bs-component/components';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { TipoRecurso } from '../../../entidades/CRUD/TipoRecurso';
import { Autor } from '../../../entidades/CRUD/Autor';
import { CategoriaRecurso } from '../../../entidades/CRUD/CategoriaRecurso';
import { Productora } from '../../../entidades/CRUD/Productora';
import { TipoRecursoService } from '../tiporecurso/tiporecurso.service';
import { AutorService } from '../autor/autor.service';
import { CategoriaRecursoService } from '../categoriarecurso/categoriarecurso.service';
import { ProductoraService } from '../productora/productora.service';

@Component({
   selector: 'app-recurso',
   templateUrl: './recurso.component.html',
   styleUrls: ['./recurso.component.scss']
})

export class RecursoComponent implements OnInit {

   busy: Promise<any>;
   entidades: Recurso[];
   entidadSeleccionada: Recurso;
   pagina: 1;
   tamanoPagina: 20;
   paginaActual: number;
   paginaUltima: number;
   registrosPorPagina: number;
   esVisibleVentanaEdicion: boolean;
   tipos: TipoRecurso[];
   autores: Autor[];
   categorias: CategoriaRecurso[];
   productoras: Productora[];

   constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private dataService: RecursoService,private tipoService: TipoRecursoService, private autorService: AutorService, private categoriaService: CategoriaRecursoService, private productoraService: ProductoraService, private modalService: NgbModal) {
      this.toastr.setRootViewContainerRef(vcr);
   }

   open(content, nuevo){
      if(nuevo){
         this.resetEntidadSeleccionada();
      }
      this.modalService.open(content)
      .result
      .then((result => {
         if(result=="save"){
            this.aceptar();
         }
      }),(result => {
         //Esto se ejecuta si la ventana se cierra sin aceptar los cambios
      }));
   }

   estaSeleccionado(porVerificar): boolean {
      if (this.entidadSeleccionada == null) {
         return false;
      }
      return porVerificar.id === this.entidadSeleccionada.id;
   }

   cerrarVentanaEdicion(): void {
      this.esVisibleVentanaEdicion = false;
   }

   mostrarVentanaNuevo(): void {
      this.resetEntidadSeleccionada();
      this.esVisibleVentanaEdicion = true;
   }

   mostrarVentanaEdicion(): void {
      this.esVisibleVentanaEdicion = true;
   }

   resetEntidadSeleccionada(): void {
      this.entidadSeleccionada = this.crearEntidad();
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

   getPagina(pagina: number, tamanoPagina: number): void {
      this.busy = this.dataService
      .getPagina(pagina, tamanoPagina)
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

   getNumeroPaginas(tamanoPagina: number): void{
      this.busy = this.dataService
      .getNumeroPaginas(tamanoPagina)
      .then(respuesta => {
         this.paginaUltima = respuesta.paginas;
      })
      .catch(error => {
         //Error al leer las paginas
      });
   }

   isValid(entidadPorEvaluar: Recurso): boolean {
      return true;
   }

   aceptar(): void {
      if (!this.isValid(this.entidadSeleccionada)) {return;}
      if (this.entidadSeleccionada.id === undefined || this.entidadSeleccionada.id === 0) {
         this.add(this.entidadSeleccionada);
      } else {
         this.update(this.entidadSeleccionada);
      }
      this.cerrarVentanaEdicion();
   }

   crearEntidad(): Recurso {
      const nuevoRecurso = new Recurso();
      nuevoRecurso.id = 0;
      return nuevoRecurso;
   }

   add(entidadNueva: Recurso): void {
      this.busy = this.dataService.create(entidadNueva)
      .then(respuesta => {
         if(respuesta){
            this.toastr.success('La creación fue exitosa', 'Creación');
         }else{
            this.toastr.warning('Se produjo un error', 'Creación');
         }
         this.refresh();
      })
      .catch(error => {
         this.toastr.warning('Se produjo un error', 'Creación');
      });
   }

   update(entidadParaActualizar: Recurso): void {
      this.busy = this.dataService.update(entidadParaActualizar)
      .then(respuesta => {
         if(respuesta){
            this.toastr.success('La actualización fue exitosa', 'Actualización');
         }else{
            this.toastr.warning('Se produjo un error', 'Actualización');
         }
         this.refresh();
      })
      .catch(error => {
         this.toastr.warning('Se produjo un error', 'Actualización');
      });
   }

   delete(entidadParaBorrar: Recurso): void {
      this.busy = this.dataService.remove(entidadParaBorrar.id)
      .then(respuesta => {
         if(respuesta){
            this.toastr.success('La eliminación fue exitosa', 'Eliminación');
         }else{
            this.toastr.warning('Se produjo un error', 'Eliminación');
         }
         this.refresh();
      })
      .catch(error => {
         this.toastr.success('Se produjo un error', 'Eliminación');
      });
   }

   refresh(): void {
      this.getNumeroPaginas(this.registrosPorPagina);
      this.getPagina(this.paginaActual,this.registrosPorPagina);
      this.entidades = Recurso[0];
      this.entidadSeleccionada = this.crearEntidad();
      this.getTipos();
      this.getAutores();
      this.getCategorias();
      this.getProductoras();
   }

   getPaginaPrimera():void {
      this.paginaActual = 1;
      this.refresh();
   }

   getPaginaAnterior():void {
      if(this.paginaActual>1){
         this.paginaActual = this.paginaActual - 1;
         this.refresh();
      }
   }

   getPaginaSiguiente():void {
      if(this.paginaActual < this.paginaUltima){
         this.paginaActual = this.paginaActual + 1;
         this.refresh();
      }
   }

   getPaginaUltima():void {
      this.paginaActual = this.paginaUltima;
      this.refresh();
   }

   ngOnInit() {
      this.paginaActual=1;
      this.registrosPorPagina = 5;
      this.refresh();
   }

   onSelect(entidadActual: Recurso): void {
      this.entidadSeleccionada = entidadActual;
   }

   getTipos(): void {
      this.busy = this.tipoService.getAll()
      .then(respuesta => {
         this.tipos = respuesta;
      })
      .catch(error => {
         console.log(error);
      });
   }

   getAutores(): void {
      this.busy = this.autorService.getAll()
      .then(respuesta => {
         this.autores = respuesta;
      })
      .catch(error => {
         console.log(error);
      });
   }

   getCategorias(): void {
      this.busy = this.categoriaService.getAll()
      .then(respuesta => {
         this.categorias = respuesta;
      })
      .catch(error => {
         console.log(error);
      });
   }

   getProductoras(): void {
      this.busy = this.productoraService.getAll()
      .then(respuesta => {
         this.productoras = respuesta;
      })
      .catch(error => {
         console.log(error);
      });
   }
}
