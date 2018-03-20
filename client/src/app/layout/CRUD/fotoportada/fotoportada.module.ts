import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FotoPortadaRoutingModule } from './fotoportada-routing.module';
import { FotoPortadaComponent } from './fotoportada.component';
import { FotoPortadaService } from './fotoportada.service';
import { RecursoService } from './../recurso/recurso.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      FotoPortadaRoutingModule
   ],
   providers: [FotoPortadaService, RecursoService],
   declarations: [FotoPortadaComponent],
})
export class FotoPortadaModule { }
