import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ComentariosSugerenciasRoutingModule } from './comentariossugerencias-routing.module';
import { ComentariosSugerenciasComponent } from './comentariossugerencias.component';
import { ComentariosSugerenciasService } from './comentariossugerencias.service';

import { PersonaService } from './../externos/persona.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      ComentariosSugerenciasRoutingModule
   ],
   providers: [ComentariosSugerenciasService, PersonaService],
   declarations: [ComentariosSugerenciasComponent],
})
export class ComentariosSugerenciasModule { }
