import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionSolicitudesComponent } from './gestionSolicitudes.component';

const routes: Routes = [
    {
        path: '',
        component: GestionSolicitudesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GestionSolicitudesRoutingModule {}
