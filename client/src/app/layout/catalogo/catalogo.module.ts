import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CatalogoRoutingModule } from './catalogo-routing.module';
import { CatalogoComponent } from './catalogo.component';
import { CatalogoService } from './catalogo.service';
import { RecursoService } from './../CRUD/recurso/recurso.service';
import { TipoRecursoService } from './../CRUD/tiporecurso/tiporecurso.service';
import { AutorService } from './../CRUD/autor/autor.service';
import { CategoriaRecursoService } from './../CRUD/categoriarecurso/categoriarecurso.service';
import { ProductoraService } from './../CRUD/productora/productora.service';
import { TagService } from './../CRUD/tag/tag.service';
import { FotoPortadaService } from './../CRUD/fotoportada/fotoportada.service';
import { RecursoDigitalService } from './../CRUD/recursodigital/recursodigital.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComentariosSugerenciasService } from './../CRUD/comentariossugerencias/comentariossugerencias.service';
import { PersonaService } from './../CRUD/externos/persona.service';
import { DescargaRecursoDigitalService } from './../CRUD/descargarecursodigital/descargarecursodigital.service';

import { NgxBarcodeModule } from 'ngx-barcode';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      NgbModule,
      CatalogoRoutingModule,
      NgxBarcodeModule
   ],
   providers: [CatalogoService, DescargaRecursoDigitalService, PersonaService, ComentariosSugerenciasService, RecursoDigitalService, TagService, FotoPortadaService,TipoRecursoService, AutorService, CategoriaRecursoService, ProductoraService, RecursoService],
   declarations: [CatalogoComponent],
})
export class CatalogoModule { }
