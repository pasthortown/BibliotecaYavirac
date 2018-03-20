import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EjemplarComponent } from './ejemplar.component';

const routes: Routes = [
   { path: '', component: EjemplarComponent }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class EjemplarRoutingModule { }
