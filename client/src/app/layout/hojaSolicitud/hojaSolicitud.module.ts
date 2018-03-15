import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HojaSolicitudRoutingModule } from './hojaSolicitud-routing.module';
import { HojaSolicitudComponent } from './hojaSolicitud.component';

@NgModule({
    imports: [CommonModule, HojaSolicitudRoutingModule],
    declarations: [HojaSolicitudComponent]
})
export class HojaSolicitudModule {}
