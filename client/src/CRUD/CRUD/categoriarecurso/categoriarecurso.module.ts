import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CategoriaRecursoRoutingModule } from './categoriarecurso-routing.module';
import { CategoriaRecursoComponent } from './categoriarecurso.component';
import { CategoriaRecursoService } from './categoriarecurso.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      CategoriaRecursoRoutingModule
   ],
   providers: [CategoriaRecursoService],
   declarations: [CategoriaRecursoComponent],
})
export class CategoriaRecursoModule { }
