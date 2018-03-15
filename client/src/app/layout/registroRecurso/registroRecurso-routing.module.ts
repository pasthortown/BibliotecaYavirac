import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroRecursoComponent } from './registroRecurso.component';

const routes: Routes = [
    {
        path: '',
        component: RegistroRecursoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegistroRecursoRoutingModule {}
