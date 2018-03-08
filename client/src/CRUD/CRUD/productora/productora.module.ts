import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProductoraRoutingModule } from './productora-routing.module';
import { ProductoraComponent } from './productora.component';
import { ProductoraService } from './productora.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      ProductoraRoutingModule
   ],
   providers: [ProductoraService],
   declarations: [ProductoraComponent],
})
export class ProductoraModule { }
