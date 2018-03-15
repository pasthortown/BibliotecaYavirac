import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRecursoRoutingModule } from './registroRecurso-routing.module';
import { RegistroRecursoComponent } from './registroRecurso.component';

@NgModule({
    imports: [CommonModule, RegistroRecursoRoutingModule],
    declarations: [RegistroRecursoComponent]
})
export class RegistroRecursoModule {}
