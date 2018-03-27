import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DescargaRecursoDigitalRoutingModule } from './descargarecursodigital-routing.module';
import { DescargaRecursoDigitalComponent } from './descargarecursodigital.component';
import { DescargaRecursoDigitalService } from './descargarecursodigital.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      DescargaRecursoDigitalRoutingModule
   ],
   providers: [DescargaRecursoDigitalService],
   declarations: [DescargaRecursoDigitalComponent],
})
export class DescargaRecursoDigitalModule { }
