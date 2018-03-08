import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SolicitudRoutingModule } from './solicitud-routing.module';
import { SolicitudComponent } from './solicitud.component';
import { SolicitudService } from './solicitud.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      SolicitudRoutingModule
   ],
   providers: [SolicitudService],
   declarations: [SolicitudComponent],
})
export class SolicitudModule { }
