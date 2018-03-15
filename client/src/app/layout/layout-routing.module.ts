import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'com2', loadChildren: './com2/com2.module#com2Module' },
            { path: 'proyecto', loadChildren: './proyecto/proyecto.module#proyectoModule' },
            { path: 'catalogo', loadChildren: './catalogo/catalogo.module#CatalogoModule' },
            { path: 'hojasolicitud', loadChildren: './hojaSolicitud/hojaSolicitud.module#HojaSolicitudModule' },
            { path: 'registrorecurso', loadChildren: './registroRecurso/registroRecurso.module#RegistroRecursoModule' },
            { path: 'recursodigital', loadChildren: './CRUD/recursodigital/recursodigital.module#RecursoDigitalModule' },
            { path: 'autor', loadChildren: './CRUD/autor/autor.module#AutorModule' },
            { path: 'perfil', loadChildren: './perfil/perfil.module#PerfilModule' },
            { path: 'categoriarecurso', loadChildren: './CRUD/categoriarecurso/categoriarecurso.module#CategoriaRecursoModule' },
            { path: 'comentariossugerencias', loadChildren: './CRUD/comentariossugerencias/comentariossugerencias.module#ComentariosSugerenciasModule' },
            { path: 'detallesolicitud', loadChildren: './CRUD/detallesolicitud/detallesolicitud.module#DetalleSolicitudModule' },
            { path: 'estadorecurso', loadChildren: './CRUD/estadorecurso/estadorecurso.module#EstadoRecursoModule' },
            { path: 'productora', loadChildren: './CRUD/productora/productora.module#ProductoraModule' },
            { path: 'recurso', loadChildren: './CRUD/recurso/recurso.module#RecursoModule' },
            { path: 'solicitud', loadChildren: './CRUD/solicitud/solicitud.module#SolicitudModule' },
            { path: 'tiporecurso', loadChildren: './CRUD/tiporecurso/tiporecurso.module#TipoRecursoModule' },
            { path: '', redirectTo: 'dashboard' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
