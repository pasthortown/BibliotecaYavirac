import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxBarcodeModule } from 'ngx-barcode';
import { RegistroRecursoRoutingModule } from './registroRecurso-routing.module';
import { RegistroRecursoComponent } from './registroRecurso.component';

@NgModule({
    imports: [CommonModule,
              RegistroRecursoRoutingModule,
              NgxBarcodeModule,
              NgbModule,
              FormsModule,
            ],
    declarations: [RegistroRecursoComponent]
})
export class RegistroRecursoModule {}
