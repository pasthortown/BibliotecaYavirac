import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil.component';

import { PersonaService } from './../CRUD/externos/persona.service';
import { GeneroService } from './../CRUD/externos/genero.service';
import { EtniaService } from './../CRUD/externos/etnia.service';
import { TipoIngresosService } from './../CRUD/externos/tipoingresos.service';
import { OcupacionService } from './../CRUD/externos/ocupacion.service';
import { TipoDiscapacidadService } from './../CRUD/externos/tipodiscapacidad.service';
import { TipoSangreService } from './../CRUD/externos/tiposangre.service';
import { EstadoCivilService } from './../CRUD/externos/estadocivil.service';
import { TituloService } from './../CRUD/externos/titulo.service';
import { EstudianteService } from './../CRUD/externos/estudiante.service';
import { TipoInstitucionProcedenciaService } from './../CRUD/externos/tipoinstitucionprocedencia.service';
import { NivelTituloService } from './../CRUD/externos/niveltitulo.service';
import { UbicacionService } from './../CRUD/externos/ubicacion.service';
import { FotoPerfilService } from './../CRUD/externos/fotoperfil.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PerfilRoutingModule
  ],
  providers: [GeneroService,
              PersonaService,
              EtniaService,
              TipoIngresosService,
              OcupacionService,
              TipoDiscapacidadService,
              TipoSangreService,
              EstadoCivilService,
              TituloService,
              EstudianteService,
              TipoInstitucionProcedenciaService,
              NivelTituloService,
              FotoPerfilService,
              UbicacionService],
  declarations: [PerfilComponent]
})
export class PerfilModule { }
