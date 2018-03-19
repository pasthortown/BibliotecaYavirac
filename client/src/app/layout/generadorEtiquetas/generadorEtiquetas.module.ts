import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneradorEtiquetasRoutingModule } from './generadorEtiquetas-routing.module';
import { GeneradorEtiquetasComponent } from './generadorEtiquetas.component';

import { RecursoService } from './../CRUD/recurso/recurso.service';

import { NgxBarcodeModule } from 'ngx-barcode';

@NgModule({
    imports: [CommonModule,
              GeneradorEtiquetasRoutingModule,
              NgxBarcodeModule
             ],
    providers: [RecursoService],
    declarations: [GeneradorEtiquetasComponent]
})
export class GeneradorEtiquetasModule {}
