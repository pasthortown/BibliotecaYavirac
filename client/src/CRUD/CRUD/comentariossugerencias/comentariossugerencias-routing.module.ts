import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComentariosSugerenciasComponent } from './comentariossugerencias.component';

const routes: Routes = [
   { path: '', component: ComentariosSugerenciasComponent }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class ComentariosSugerenciasRoutingModule { }
