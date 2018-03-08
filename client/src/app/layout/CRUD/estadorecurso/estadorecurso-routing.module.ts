import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstadoRecursoComponent } from './estadorecurso.component';

const routes: Routes = [
   { path: '', component: EstadoRecursoComponent }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class EstadoRecursoRoutingModule { }
