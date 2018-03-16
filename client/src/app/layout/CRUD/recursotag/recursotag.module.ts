import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RecursoTagRoutingModule } from './recursotag-routing.module';
import { RecursoTagComponent } from './recursotag.component';
import { RecursoTagService } from './recursotag.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      RecursoTagRoutingModule
   ],
   providers: [RecursoTagService],
   declarations: [RecursoTagComponent],
})
export class RecursoTagModule { }
