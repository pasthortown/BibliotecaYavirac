import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { proyectoComponent } from './proyecto.component';

const routes: Routes = [
    {
        path: '',
        component: proyectoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class proyectoRoutingModule {}
