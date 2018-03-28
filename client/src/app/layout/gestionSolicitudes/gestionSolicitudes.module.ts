import { PersonaService } from './../CRUD/externos/persona.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GestionSolicitudesRoutingModule } from './gestionSolicitudes-routing.module';
import { GestionSolicitudesComponent } from './gestionSolicitudes.component';

import { NgxBarcodeModule } from 'ngx-barcode';

import { SolicitudService } from '../CRUD/solicitud/solicitud.service';
import { DetalleSolicitudService } from './../CRUD/detallesolicitud/detallesolicitud.service';
import { RecursoService } from './../CRUD/recurso/recurso.service';

@NgModule({
    imports: [CommonModule, FormsModule, GestionSolicitudesRoutingModule, NgxBarcodeModule],
    providers: [SolicitudService, PersonaService,RecursoService, DetalleSolicitudService],
    declarations: [GestionSolicitudesComponent]
})
export class GestionSolicitudesModule {}
