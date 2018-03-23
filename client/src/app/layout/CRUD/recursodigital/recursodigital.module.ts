import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RecursoDigitalRoutingModule } from './recursodigital-routing.module';
import { RecursoDigitalComponent } from './recursodigital.component';
import { RecursoDigitalService } from './recursodigital.service';
import { Recurso } from '../../../entidades/CRUD/Recurso';
import { RecursoService } from '../recurso/recurso.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      RecursoDigitalRoutingModule
   ],
   providers: [RecursoDigitalService, RecursoService],
   declarations: [RecursoDigitalComponent],
})
export class RecursoDigitalModule { }
