import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DetalleSolicitudRoutingModule } from './detallesolicitud-routing.module';
import { DetalleSolicitudComponent } from './detallesolicitud.component';
import { DetalleSolicitudService } from './detallesolicitud.service';

import { SolicitudService } from './../solicitud/solicitud.service';
import { RecursoService } from './../recurso/recurso.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      DetalleSolicitudRoutingModule
   ],
   providers: [DetalleSolicitudService, SolicitudService, RecursoService],
   declarations: [DetalleSolicitudComponent],
})
export class DetalleSolicitudModule { }
