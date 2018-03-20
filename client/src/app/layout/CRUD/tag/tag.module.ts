import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TagRoutingModule } from './tag-routing.module';
import { TagComponent } from './tag.component';
import { TagService } from './tag.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      TagRoutingModule
   ],
   providers: [TagService],
   declarations: [TagComponent],
})
export class TagModule { }
