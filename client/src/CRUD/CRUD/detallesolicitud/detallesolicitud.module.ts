import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DetalleSolicitudRoutingModule } from './detallesolicitud-routing.module';
import { DetalleSolicitudComponent } from './detallesolicitud.component';
import { DetalleSolicitudService } from './detallesolicitud.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      DetalleSolicitudRoutingModule
   ],
   providers: [DetalleSolicitudService],
   declarations: [DetalleSolicitudComponent],
})
export class DetalleSolicitudModule { }
