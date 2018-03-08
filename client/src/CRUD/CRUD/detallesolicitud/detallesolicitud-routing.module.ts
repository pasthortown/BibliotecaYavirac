import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalleSolicitudComponent } from './detallesolicitud.component';

const routes: Routes = [
   { path: '', component: DetalleSolicitudComponent }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class DetalleSolicitudRoutingModule { }
