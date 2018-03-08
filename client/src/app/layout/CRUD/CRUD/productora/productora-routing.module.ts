import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoraComponent } from './productora.component';

const routes: Routes = [
   { path: '', component: ProductoraComponent }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class ProductoraRoutingModule { }
