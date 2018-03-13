import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { com2Component } from './com2.component';

const routes: Routes = [
    {
        path: '',
        component: com2Component
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class com2RoutingModule {}
