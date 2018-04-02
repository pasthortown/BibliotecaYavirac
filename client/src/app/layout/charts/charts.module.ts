import { ChartsService } from './charts.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [CommonModule, Ng2Charts, ChartsRoutingModule, PageHeaderModule],
    providers: [ChartsService],
    declarations: [ChartsComponent]
})
export class ChartsModule {}
