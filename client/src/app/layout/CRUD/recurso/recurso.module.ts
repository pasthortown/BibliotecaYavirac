import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RecursoRoutingModule } from './recurso-routing.module';
import { RecursoComponent } from './recurso.component';
import { RecursoService } from './recurso.service';
import { TipoRecursoService } from '../tiporecurso/tiporecurso.service';
import { AutorService } from '../autor/autor.service';
import { CategoriaRecursoService } from '../categoriarecurso/categoriarecurso.service';
import { ProductoraService } from '../productora/productora.service';


@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      RecursoRoutingModule
   ],
   providers: [RecursoService, TipoRecursoService, AutorService, CategoriaRecursoService, ProductoraService],
   declarations: [RecursoComponent],
})
export class RecursoModule { }
