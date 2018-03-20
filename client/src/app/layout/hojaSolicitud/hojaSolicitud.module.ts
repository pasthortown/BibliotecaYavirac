import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HojaSolicitudRoutingModule } from './hojaSolicitud-routing.module';
import { HojaSolicitudComponent } from './hojaSolicitud.component';

import { NgxBarcodeModule } from 'ngx-barcode';

@NgModule({
    imports: [CommonModule, HojaSolicitudRoutingModule, NgxBarcodeModule],
    declarations: [HojaSolicitudComponent]
})
export class HojaSolicitudModule {}
