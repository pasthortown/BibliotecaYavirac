import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecursoTagComponent } from './recursotag.component';

const routes: Routes = [
   { path: '', component: RecursoTagComponent }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class RecursoTagRoutingModule { }
