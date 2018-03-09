import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { proyectoRoutingModule } from './proyecto-routing.module';
import { proyectoComponent } from './proyecto.component';

@NgModule({
    imports: [CommonModule, proyectoRoutingModule],
    declarations: [proyectoComponent]
})
export class proyectoModule {}
