import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneradorEtiquetasRoutingModule } from './generadorEtiquetas-routing.module';
import { GeneradorEtiquetasComponent } from './generadorEtiquetas.component';

import { NgxBarcodeModule } from 'ngx-barcode';

@NgModule({
    imports: [CommonModule,
              GeneradorEtiquetasRoutingModule,
              NgxBarcodeModule
             ],
    declarations: [GeneradorEtiquetasComponent]
})
export class GeneradorEtiquetasModule {}
