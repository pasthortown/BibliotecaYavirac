import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneradorEtiquetasComponent } from './generadorEtiquetas.component';

const routes: Routes = [
    {
        path: '',
        component: GeneradorEtiquetasComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GeneradorEtiquetasRoutingModule {}
