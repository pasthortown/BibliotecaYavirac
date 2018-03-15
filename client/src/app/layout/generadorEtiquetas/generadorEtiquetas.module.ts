import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneradorEtiquetasRoutingModule } from './generadorEtiquetas-routing.module';
import { GeneradorEtiquetasComponent } from './generadorEtiquetas.component';

@NgModule({
    imports: [CommonModule, GeneradorEtiquetasRoutingModule],
    declarations: [GeneradorEtiquetasComponent]
})
export class GeneradorEtiquetasModule {}
