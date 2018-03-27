import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DescargaRecursoDigitalComponent } from './descargarecursodigital.component';

const routes: Routes = [
   { path: '', component: DescargaRecursoDigitalComponent }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class DescargaRecursoDigitalRoutingModule { }
