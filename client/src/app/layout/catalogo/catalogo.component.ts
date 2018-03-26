import { LoginResult } from './../../entidades/especifico/Login-Result';
import { PersonaService } from './../CRUD/externos/persona.service';
import { Persona } from './../../entidades/CRUD/Persona';
import { ComentariosSugerenciasService } from './../CRUD/comentariossugerencias/comentariossugerencias.service';
import { ComentariosSugerencias } from './../../entidades/CRUD/ComentariosSugerencias';
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
import { RecursoDigitalService } from './../CRUD/recursodigital/recursodigital.service';
import { RecursoDigital } from './../../entidades/CRUD/RecursoDigital';
import { saveAs } from "file-saver/FileSaver";

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
   recursosSolicitados: Recurso[];
   recursoDigital: RecursoDigital;
   comentariosSugerencias: ComentariosSugerencias[];
   personasComentan: Persona;
   comentario: ComentariosSugerencias;
   filtroBuscar: string;

   constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private catalogoService: CatalogoService, private dataService: RecursoService, private tagService: TagService, private tipoService: TipoRecursoService, private autorService: AutorService, private categoriaService: CategoriaRecursoService, private productoraService: ProductoraService, private fotoPortadaService: FotoPortadaService, private recursoDigitalService: RecursoDigitalService, private comentariosSugerenciasService: ComentariosSugerenciasService, private personaService: PersonaService, private modalService: NgbModal) {
      this.toastr.setRootViewContainerRef(vcr);
   }

   mostrarInfo(content, id){
      const options: NgbModalOptions = {
        size: 'lg'
      };
      this.modalService.open(content, options)
      .result
      .then((result => {
         if(result=='download'){
             this.descargarRecursoDigital();
         }
         if(result=='solicitar'){
            this.solicitar();
         }
         if(result=='cerrar'){
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
    this.busy = this.dataService
    .buscar(this.filtroBuscar)
    .then(entidadesRecuperadas => {
        this.entidades = entidadesRecuperadas
    })
    .catch(error => {

    });
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
      this.getRecursosSolicitados();
      this.getAll();
      this.entidadSeleccionada = this.crearEntidad();
      this.nuevoComentario();
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
       this.nuevoComentario();
       this.getRecursoDigital(this.entidadSeleccionada.id);
       this.getTags(this.entidadSeleccionada.id);
       this.getFotoPortada(this.entidadSeleccionada.id);
       this.getComentariosSugerencias(this.entidadSeleccionada.id);
   }

   nuevoComentario(): void {
        this.comentario = new ComentariosSugerencias();
        const logedResult = JSON.parse(localStorage.getItem('logedResult')) as LoginResult;
        const personaLogeada = logedResult.persona;
        this.comentario.Persona = personaLogeada.nombre1 + ' ' + personaLogeada.nombre2 + ' ' + personaLogeada.apellido1 + ' ' + personaLogeada.apellido2;
        this.comentario.idRecurso = this.entidadSeleccionada.id;
        this.comentario.idPersona = personaLogeada.id;
   }

   registrarComentario() {
        this.comentario.fecha = new Date();
        this.busy = this.comentariosSugerenciasService.create(this.comentario)
        .then(respuesta => {
            this.getComentariosSugerencias(this.entidadSeleccionada.id);
            this.nuevoComentario();
        })
        .catch(error => {

        });
   }

   getComentariosSugerencias(id:number): void {
        this.comentariosSugerencias = [];
        this.busy = this.comentariosSugerenciasService.getFiltrado('idRecurso','coincide',id.toString())
        .then(entidadesRecuperadas => {
            if( entidadesRecuperadas.toString() === '0' ) {
                return;
            }
            this.comentariosSugerencias = entidadesRecuperadas;
            this.comentariosSugerencias.forEach(comentarioSugerencia => {
                this.busy = this.personaService.get(comentarioSugerencia.idPersona)
                .then(persona => {
                    comentarioSugerencia.Persona = persona.nombre1 + ' ' + persona.nombre2 + ' ' +  persona.apellido1 + ' ' +  persona.apellido2;
                })
                .catch(error => {

                });
            });
        })
        .catch(error => {

        });
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

   solicitar() {
      let yaSolicitado: Boolean = false;
      this.recursosSolicitados.forEach(recurso => {
          if (recurso.id == this.entidadSeleccionada.id) {
            yaSolicitado = true;
          }
      });
      if(yaSolicitado){
          this.toastr.warning('Recurso existente en la solicitud', 'Solicitud');
          return;
      }
      this.recursosSolicitados.push(this.entidadSeleccionada);
      localStorage.setItem('recursosSolicitados', JSON.stringify(this.recursosSolicitados));
      this.getRecursosSolicitados();
      this.toastr.success('Recurso añadido a la solicitud', 'Solicitud');
   }

   getRecursosSolicitados() {
        if(localStorage.getItem('recursosSolicitados') == 'undefined') {
            this.recursosSolicitados = [];
        } else {
            this.recursosSolicitados = JSON.parse(localStorage.getItem('recursosSolicitados')) as Recurso[];
        }
   }

   getTags(id: number) {
    this.tags = [];
    this.busy = this.catalogoService
    .getTags(id)
    .then(entidadesRecuperadas => {
       this.tags = entidadesRecuperadas;
    })
    .catch(error => {

    });
   }

   getFotoPortada(id:number) {
    this.fotoPortada = new FotoPortada();
    this.srcFoto = '';
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

    descargarRecursoDigital() {
        if(this.recursoDigital.adjunto == '' || this.recursoDigital.adjunto == null){
            return;
        }
        this.downloadFile();
    }

    downloadFile() {
        const byteCharacters = atob(this.recursoDigital.adjunto);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: ''+this.recursoDigital.tipoArchivo+'' });
        saveAs(blob, this.recursoDigital.nombreArchivo);
    }

    getRecursoDigital(id:number) {
        this.recursoDigital = new RecursoDigital();
        this.busy = this.recursoDigitalService.getFiltrado('idRecurso','coincide',id.toString())
        .then(entidadesRecuperadas => {
            if( entidadesRecuperadas.toString() === '0' ) {
                return;
            }
            this.recursoDigital = entidadesRecuperadas[0];
        })
        .catch(error => {

        });
    }

    public closeAlert(alert: any) {
        const index: number = this.comentariosSugerencias.indexOf(alert);
        this.comentariosSugerencias.splice(index, 1);
    }
}
