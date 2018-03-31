import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HojaSolicitudRoutingModule } from './hojaSolicitud-routing.module';
import { HojaSolicitudComponent } from './hojaSolicitud.component';

import { NgxBarcodeModule } from 'ngx-barcode';

import { SolicitudService } from '../CRUD/solicitud/solicitud.service';
import { DetalleSolicitudService } from './../CRUD/detallesolicitud/detallesolicitud.service';
import { MailSenderService } from './../CRUD/externos/mailsender.service';

@NgModule({
    imports: [CommonModule, HojaSolicitudRoutingModule, NgxBarcodeModule],
    providers: [SolicitudService, DetalleSolicitudService, MailSenderService],
    declarations: [HojaSolicitudComponent]
})
export class HojaSolicitudModule {}
