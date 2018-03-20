import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EjemplarRoutingModule } from './ejemplar-routing.module';
import { EjemplarComponent } from './ejemplar.component';
import { EjemplarService } from './ejemplar.service';

import { RecursoService } from './../recurso/recurso.service';
import { EstadoService } from './../estado/estado.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      EjemplarRoutingModule
   ],
   providers: [EjemplarService, RecursoService, EstadoService],
   declarations: [EjemplarComponent],
})
export class EjemplarModule { }
