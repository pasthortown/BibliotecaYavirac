import { Ejemplar } from './../../entidades/CRUD/Ejemplar';
import { RecursoTag } from './../../entidades/CRUD/RecursoTag';
import { RecursoTagService } from './../CRUD/recursotag/recursotag.service';
import { TagService } from './../CRUD/tag/tag.service';
import { RecursoService } from './../CRUD/recurso/recurso.service';
import { Recurso } from './../../entidades/CRUD/Recurso';
import { FotoPortada } from './../../entidades/CRUD/FotoPortada';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Productora } from './../../entidades/CRUD/Productora';
import { Autor } from './../../entidades/CRUD/Autor';
import { ModalComponent } from './../bs-component/components';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TipoRecurso } from '../../entidades/CRUD/TipoRecurso';
import { Estado } from '../../entidades/CRUD/Estado';
import { CategoriaRecurso } from '../../entidades/CRUD/CategoriaRecurso';
import { ProductoraService } from '../CRUD/productora/productora.service';
import { AutorService } from '../CRUD/autor/autor.service';
import { TipoRecursoService } from '../CRUD/tiporecurso/tiporecurso.service';
import { CategoriaRecursoService } from '../CRUD/categoriarecurso/categoriarecurso.service';
import { EstadoService } from '../CRUD/estado/estado.service';
import { FotoPortadaService } from '../CRUD/fotoportada/fotoportada.service';
import { Tag } from '../../entidades/CRUD/Tag';

@Component({
    selector: 'app-registroRecurso',
    templateUrl: './registroRecurso.component.html',
    styleUrls: ['./registroRecurso.component.scss']
})
export class RegistroRecursoComponent implements OnInit {
    busy: Promise<any>;
    entidadSeleccionadaAutor: Autor;
    entidadSeleccionadaProductora: Productora;
    autores: Autor[];
    productoras: Productora[];
    tipos: TipoRecurso[];
    categorias: CategoriaRecurso[];
    estados: Estado[];
    activeTab: string;
    fotoPortada: FotoPortada;
    srcFoto: string;
    recursoNuevo: Recurso;
    tagsIngresados: string;
    idRecursoSeleccionado: number;
    recursos: Recurso[];
    ejemplares: Ejemplar[];

    constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private modalService: NgbModal, private productoraService: ProductoraService, private autorService: AutorService, private tipoService: TipoRecursoService, private categoriaService: CategoriaRecursoService, private estadoService: EstadoService, private recursoService: RecursoService, private fotoPortadaService: FotoPortadaService, private tagService: TagService, private recursoTagServive: RecursoTagService) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.refresh();
    }

    refresh():void {
        this.idRecursoSeleccionado = 0;
        this.entidadSeleccionadaAutor = new Autor();
        this.entidadSeleccionadaAutor.id = 0;
        this.entidadSeleccionadaProductora = new Productora();
        this.entidadSeleccionadaProductora.id = 0;
        this.fotoPortada = new FotoPortada();
        this.fotoPortada.id = 0;
        this.recursoNuevo = new Recurso();
        this.recursoNuevo.id = 0;
        this.recursoNuevo.idAutor = 0;
        this.recursoNuevo.idProductora = 0;
        this.recursoNuevo.idTipo = 0;
        this.recursoNuevo.idCategoria = 0;
        this.ejemplares= [];
        this.getAutores();
        this.getCategorias();
        this.getEstados();
        this.getProductoras();
        this.getTipos();
        this.getRecursos();
    }

    openAutor(content){
        if( this.recursoNuevo.idAutor == 0 ) {
            this.entidadSeleccionadaAutor = new Autor();
            this.entidadSeleccionadaAutor.id = 0;
        }
        this.modalService.open(content)
        .result
        .then((result => {
            if(result == 'save'){
                if( this.recursoNuevo.idAutor == 0 ) {
                    this.nuevoAutor();
                } else {
                    this.actualizaAutor();
                }
            }
        }),(result => {
           //Esto se ejecuta si la ventana se cierra sin aceptar los cambios
        }));
    }

    openProductora(content){
        if( this.recursoNuevo.idProductora == 0 ) {
            this.entidadSeleccionadaProductora = new Productora();
            this.entidadSeleccionadaProductora.id = 0;
        }
        this.modalService.open(content)
        .result
        .then((result => {
            if(result == 'save'){
                if( this.recursoNuevo.idProductora == 0 ) {
                    this.nuevoProductora();
                } else {
                    this.actualizaProductora();
                }
            }
        }),(result => {
           //Esto se ejecuta si la ventana se cierra sin aceptar los cambios
        }));
    }

    getEstados(): void {
        this.busy = this.estadoService.getAll()
        .then(respuesta => {
           this.estados = respuesta;
        })
        .catch(error => {
           console.log(error);
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

    getRecursos(): void {
        this.busy = this.recursoService.getAll()
        .then(respuesta => {
        this.recursos = respuesta;
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

    CodificarArchivo(event) {
        const reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.fotoPortada.tipoArchivo = file.type;
                this.fotoPortada.nombreArchivo = file.name;
                this.fotoPortada.adjunto = reader.result.split(',')[1];
                this.srcFoto = 'data:' + this.fotoPortada.tipoArchivo + ';base64,' + this.fotoPortada.adjunto;
            };
        }
    }

    CodificarArchivoAdjunto(event) {
        const reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                /*this.fotoPortada.tipoArchivo = file.type;
                this.fotoPortada.nombreArchivo = file.name;
                this.fotoPortada.adjunto = reader.result.split(',')[1];
                this.srcFoto = 'data:' + this.fotoPortada.tipoArchivo + ';base64,' + this.fotoPortada.adjunto;*/
            };
        }
    }

    showTab(tabId) {
        this.activeTab = tabId;
    }

    seleccionadoProductora() {
        this.busy = this.productoraService.get(this.recursoNuevo.idProductora)
        .then(respuesta => {
            this.entidadSeleccionadaProductora = respuesta;
        })
        .catch(error => {
            console.log(error);
        });
    }

    seleccionadoAutor() {
        this.busy = this.autorService.get(this.recursoNuevo.idAutor)
        .then(respuesta => {
            this.entidadSeleccionadaAutor = respuesta;
        })
        .catch(error => {
            console.log(error);
        });
    }

    actualizaAutor() {
        this.busy = this.autorService.update(this.entidadSeleccionadaAutor)
        .then(respuesta => {
           if(respuesta){
              this.toastr.success('La actualización fue exitosa', 'Actualización');
           }else{
              this.toastr.warning('Se produjo un error', 'Actualización');
           }
           this.getAutores();
        })
        .catch(error => {
           this.toastr.warning('Se produjo un error', 'Actualización');
        });
    }

    nuevoAutor() {
        this.busy = this.autorService.create(this.entidadSeleccionadaAutor)
        .then(respuesta => {
           if(respuesta){
              this.toastr.success('La creación fue exitosa', 'Creación');
           }else{
              this.toastr.warning('Se produjo un error', 'Creación');
           }
           this.getAutores();
        })
        .catch(error => {
           this.toastr.warning('Se produjo un error', 'Creación');
        });
    }

    actualizaProductora() {
        this.busy = this.productoraService.update(this.entidadSeleccionadaProductora)
        .then(respuesta => {
           if(respuesta){
              this.toastr.success('La actualización fue exitosa', 'Actualización');
           }else{
              this.toastr.warning('Se produjo un error', 'Actualización');
           }
           this.getProductoras();
        })
        .catch(error => {
           this.toastr.warning('Se produjo un error', 'Actualización');
        });
    }

    nuevoProductora() {
        this.busy = this.productoraService.create(this.entidadSeleccionadaProductora)
        .then(respuesta => {
           if(respuesta){
              this.toastr.success('La creación fue exitosa', 'Creación');
           }else{
              this.toastr.warning('Se produjo un error', 'Creación');
           }
           this.getProductoras();
        })
        .catch(error => {
           this.toastr.warning('Se produjo un error', 'Creación');
        });
    }

    guardarRecurso(): void {
        this.busy = this.recursoService.create(this.recursoNuevo)
        .then(respuesta => {
            this.busy = this.recursoService.getFiltrado('titulo','coincide',this.recursoNuevo.titulo)
            .then(recursosConTituloIgual => {
                recursosConTituloIgual.forEach(recurso => {
                   if ( recurso.idAutor == this.recursoNuevo.idAutor
                    && recurso.idProductora == this.recursoNuevo.idProductora
                    && recurso.idTipo == this.recursoNuevo.idTipo
                    && recurso.codigoISBN == this.recursoNuevo.codigoISBN ) {
                        this.fotoPortada.idRecurso = recurso.id;
                        this.guardarFotoPortada();
                        this.guardarTags(recurso.id);
                        this.toastr.success('Se ha registrado el recurso satisfactoriamente', 'Recurso Registrado');
                        return;
                    }
               });
            })
            .catch(error => {

            });
        })
        .catch(error => {
            this.toastr.warning('Ha ocurrido un error al registrar el nuevo recurso', 'Recurso Registrado');
        });
    }

    guardarFotoPortada(): void {
        this.busy = this.fotoPortadaService.create(this.fotoPortada)
        .then(respuesta => {

        })
        .catch(error => {

        });
    }

    guardarTags(idRecurso: number): void {
        this.tagsIngresados.split(',').forEach(tagPorIngresar => {
            if(tagPorIngresar=='' || tagPorIngresar==null){
                return;
            }
            this.guardarTag(idRecurso, tagPorIngresar.trim());
        });
    }

    guardarTag(idRecurso: number, descripcion: string){
        const nuevoTag = new Tag();
        nuevoTag.descripcion = descripcion;
        this.busy = this.tagService.create(nuevoTag)
        .then(respuesta => {
            this.busy = this.tagService.getFiltrado('descripcion','coincide',descripcion)
            .then(tagRecienCreado => {
                const nuevoRecursoTag = new RecursoTag();
                nuevoRecursoTag.idRecurso = idRecurso;
                nuevoRecursoTag.idTag = tagRecienCreado[0].id;
                this.busy = this.recursoTagServive.create(nuevoRecursoTag)
                .then(respuesta => {

                })
                .catch(error => {

                });
            })
            .catch(error => {

            });
        })
        .catch(error => {

        });
    }

    seleccionadoRecurso() {
        this.tagsIngresados = '';
        this.busy = this.recursoService.get(this.idRecursoSeleccionado)
        .then(respuesta => {
            this.recursoNuevo = respuesta;
            this.getFotoPortada(this.recursoNuevo.id);
            this.getTags(this.recursoNuevo.id);
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

    getTags(id:number) {
        this.busy = this.recursoTagServive.getFiltrado('idRecurso','coincide',id.toString())
        .then(entidadesRecuperadas => {
            if( entidadesRecuperadas.toString() === '0' ) {
                return;
            }
            entidadesRecuperadas.forEach(tag => {
                this.tagsIngresados += tag.descripcion + ', ';
            });
            this.tagsIngresados = this.tagsIngresados.trim();
        })
        .catch(error => {

        });
    }

    agregarEjemplar() {
        const ejemplar = new Ejemplar();
        if(this.recursoNuevo.idCategoria == 0 || this.recursoNuevo.idCategoria == null){
            return;
        }
        this.categorias.forEach(categoria => {
            if(categoria.id ==this.recursoNuevo.idCategoria){
                ejemplar.codigo = categoria.codigo + '-' + (this.ejemplares.length + 1);
                return;
            }
        });
        this.ejemplares.push(ejemplar);
    }

    retirarEjemplar() {
        if(this.recursoNuevo.idCategoria == 0 || this.recursoNuevo.idCategoria == null || this.ejemplares.length == 0){
            return;
        }
        this.ejemplares.pop();
    }
}
