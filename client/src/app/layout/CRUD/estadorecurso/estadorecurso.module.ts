import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EstadoRecursoRoutingModule } from './estadorecurso-routing.module';
import { EstadoRecursoComponent } from './estadorecurso.component';
import { EstadoRecursoService } from './estadorecurso.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      EstadoRecursoRoutingModule
   ],
   providers: [EstadoRecursoService],
   declarations: [EstadoRecursoComponent],
})
export class EstadoRecursoModule { }
