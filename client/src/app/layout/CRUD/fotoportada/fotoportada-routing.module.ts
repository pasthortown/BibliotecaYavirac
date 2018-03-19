import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FotoPortadaComponent } from './fotoportada.component';

const routes: Routes = [
   { path: '', component: FotoPortadaComponent }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class FotoPortadaRoutingModule { }
