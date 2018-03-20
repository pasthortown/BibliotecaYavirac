import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CatalogoService } from './catalogo.service';

import 'rxjs/add/operator/toPromise';
import { ModalComponent } from '../bs-component/components';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Recurso } from '../../entidades/CRUD/Recurso';
import { TipoRecurso } from '../../entidades/CRUD/TipoRecurso';
import { Autor } from '../../entidades/CRUD/Autor';
import { CategoriaRecurso } from '../../entidades/CRUD/CategoriaRecurso';
import { Productora } from '../../entidades/CRUD/Productora';
import { TipoRecursoService } from '../CRUD/tiporecurso/tiporecurso.service';
import { AutorService } from '../CRUD/autor/autor.service';
import { CategoriaRecursoService } from '../CRUD/categoriarecurso/categoriarecurso.service';
import { ProductoraService } from '../CRUD/productora/productora.service';
import { RecursoService } from '../CRUD/recurso/recurso.service';
import { TagService } from './../CRUD/tag/tag.service';
import { Tag } from './../../entidades/CRUD/Tag';
import { FotoPortadaService } from '../CRUD/fotoportada/fotoportada.service';
import { FotoPortada } from './../../entidades/CRUD/FotoPortada';

@Component({
   selector: 'app-recurso',
   templateUrl: './catalogo.component.html',
   styleUrls: ['./catalogo.component.scss']
})

export class CatalogoComponent implements OnInit {

   busy: Promise<any>;
   entidades: Recurso[];
   entidadSeleccionada: Recurso;
   esVisibleVentanaEdicion: boolean;
   tipos: TipoRecurso[];
   autores: Autor[];
   categorias: CategoriaRecurso[];
   productoras: Productora[];
   tags: Tag[];
   fotoPortada: FotoPortada;
   srcFoto: string;

   constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private catalogoService: CatalogoService, private dataService: RecursoService, private tagService: TagService, private tipoService: TipoRecursoService, private autorService: AutorService, private categoriaService: CategoriaRecursoService, private productoraService: ProductoraService, private fotoPortadaService: FotoPortadaService, private modalService: NgbModal) {
      this.toastr.setRootViewContainerRef(vcr);
   }

   mostrarInfo(content, id){
      this.getTags(id);
      this.getFotoPortada(id);
      const options: NgbModalOptions = {
        size: 'lg'
      };
      this.modalService.open(content, options)
      .result
      .then((result => {
         if(result=="pdf"){
             this.descargarPDF(this.entidadSeleccionada.id);
         }
         if(result=="solicitar"){
            this.solicitar(this.entidadSeleccionada.id);
         }
         if(result=="cerrar"){
            // al cancelar
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

   getFiltrado(): void {

   }

   isValid(entidadPorEvaluar: Recurso): boolean {
      return true;
   }

   crearEntidad(): Recurso {
      const nuevoRecurso = new Recurso();
      nuevoRecurso.id = 0;
      return nuevoRecurso;
   }

   refresh(): void {
      this.getAll();
      this.entidadSeleccionada = this.crearEntidad();
      this.getTipos();
      this.getAutores();
      this.getCategorias();
      this.getProductoras();
   }

   ngOnInit() {
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

   descargarPDF(id) {
       alert(id);
   }

   solicitar(id) {
       alert(id);
   }

   getTags(id: number) {
    this.busy = this.catalogoService
    .getTags(id)
    .then(entidadesRecuperadas => {
       this.tags = entidadesRecuperadas;
    })
    .catch(error => {

    });
   }

   getFotoPortada(id:number) {
    this.busy = this.fotoPortadaService.getFiltrado('idRecurso','coincide',id.toString())
    .then(entidadesRecuperadas => {
       if( entidadesRecuperadas.toString() === '0' ) {
           return;
       }
       this.fotoPortada = entidadesRecuperadas[0];
       this.srcFoto = 'data:' + this.fotoPortada.tipoArchivo + ';base64,' + this.fotoPortada.adjunto;
    })
    .catch(error => {

    });
   }
}
