import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TipoRecursoRoutingModule } from './tiporecurso-routing.module';
import { TipoRecursoComponent } from './tiporecurso.component';
import { TipoRecursoService } from './tiporecurso.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      TipoRecursoRoutingModule
   ],
   providers: [TipoRecursoService],
   declarations: [TipoRecursoComponent],
})
export class TipoRecursoModule { }
