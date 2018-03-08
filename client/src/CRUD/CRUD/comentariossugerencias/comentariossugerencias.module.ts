import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ComentariosSugerenciasRoutingModule } from './comentariossugerencias-routing.module';
import { ComentariosSugerenciasComponent } from './comentariossugerencias.component';
import { ComentariosSugerenciasService } from './comentariossugerencias.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      ComentariosSugerenciasRoutingModule
   ],
   providers: [ComentariosSugerenciasService],
   declarations: [ComentariosSugerenciasComponent],
})
export class ComentariosSugerenciasModule { }
