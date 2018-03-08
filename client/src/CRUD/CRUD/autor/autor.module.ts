import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AutorRoutingModule } from './autor-routing.module';
import { AutorComponent } from './autor.component';
import { AutorService } from './autor.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      AutorRoutingModule
   ],
   providers: [AutorService],
   declarations: [AutorComponent],
})
export class AutorModule { }
