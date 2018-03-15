import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HojaSolicitudComponent } from './hojaSolicitud.component';

const routes: Routes = [
    {
        path: '',
        component: HojaSolicitudComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HojaSolicitudRoutingModule {}
