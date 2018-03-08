import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RecursoRoutingModule } from './recurso-routing.module';
import { RecursoComponent } from './recurso.component';
import { RecursoService } from './recurso.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      RecursoRoutingModule
   ],
   providers: [RecursoService],
   declarations: [RecursoComponent],
})
export class RecursoModule { }
