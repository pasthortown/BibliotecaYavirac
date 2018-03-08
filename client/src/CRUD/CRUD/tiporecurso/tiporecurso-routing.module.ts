import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoRecursoComponent } from './tiporecurso.component';

const routes: Routes = [
   { path: '', component: TipoRecursoComponent }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class TipoRecursoRoutingModule { }
