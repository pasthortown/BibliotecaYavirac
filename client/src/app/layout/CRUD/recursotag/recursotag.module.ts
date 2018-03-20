import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RecursoTagRoutingModule } from './recursotag-routing.module';
import { RecursoTagComponent } from './recursotag.component';
import { RecursoTagService } from './recursotag.service';

import { RecursoService } from './../recurso/recurso.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      RecursoTagRoutingModule
   ],
   providers: [RecursoTagService, RecursoService],
   declarations: [RecursoTagComponent],
})
export class RecursoTagModule { }
