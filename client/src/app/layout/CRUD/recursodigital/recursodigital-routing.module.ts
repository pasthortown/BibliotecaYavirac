import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecursoDigitalComponent } from './recursodigital.component';

const routes: Routes = [
   { path: '', component: RecursoDigitalComponent }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class RecursoDigitalRoutingModule { }
