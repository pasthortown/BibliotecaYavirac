import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EjemplarRoutingModule } from './ejemplar-routing.module';
import { EjemplarComponent } from './ejemplar.component';
import { EjemplarService } from './ejemplar.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      EjemplarRoutingModule
   ],
   providers: [EjemplarService],
   declarations: [EjemplarComponent],
})
export class EjemplarModule { }
