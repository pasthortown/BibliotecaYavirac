import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneradorEtiquetasRoutingModule } from './generadorEtiquetas-routing.module';
import { GeneradorEtiquetasComponent } from './generadorEtiquetas.component';

import { RecursoService } from './../CRUD/recurso/recurso.service';

import { NgxBarcodeModule } from 'ngx-barcode';

import { GeneradorEtiquetasService } from './generadorEtiquetas.service';

@NgModule({
    imports: [CommonModule,
              GeneradorEtiquetasRoutingModule,
              NgxBarcodeModule
             ],
    providers: [RecursoService, GeneradorEtiquetasService],
    declarations: [GeneradorEtiquetasComponent]
})
export class GeneradorEtiquetasModule {}
