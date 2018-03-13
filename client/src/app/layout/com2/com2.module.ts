import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { com2RoutingModule } from './com2-routing.module';
import { com2Component } from './com2.component';

@NgModule({
    imports: [CommonModule, com2RoutingModule],
    declarations: [com2Component]
})
export class com2Module {}
