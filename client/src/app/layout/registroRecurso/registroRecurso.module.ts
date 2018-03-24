import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxBarcodeModule } from 'ngx-barcode';
import { RegistroRecursoRoutingModule } from './registroRecurso-routing.module';
import { RegistroRecursoComponent } from './registroRecurso.component';
import { ProductoraService } from '../CRUD/productora/productora.service';
import { AutorService } from '../CRUD/autor/autor.service';
import { TipoRecursoService } from '../CRUD/tiporecurso/tiporecurso.service';
import { CategoriaRecursoService } from '../CRUD/categoriarecurso/categoriarecurso.service';
import { EstadoService } from '../CRUD/estado/estado.service';
import { RecursoService } from './../CRUD/recurso/recurso.service';
import { FotoPortadaService } from '../CRUD/fotoportada/fotoportada.service';
import { RecursoTagService } from './../CRUD/recursotag/recursotag.service';
import { TagService } from './../CRUD/tag/tag.service';
import { RecursoDigitalService } from './../CRUD/recursodigital/recursodigital.service';
import { UbicacionService } from './../CRUD/externos/ubicacion.service';
import { EjemplarService } from './../CRUD/ejemplar/ejemplar.service';

@NgModule({
    imports: [CommonModule,
              RegistroRecursoRoutingModule,
              NgxBarcodeModule,
              NgbModule,
              FormsModule,
              HttpModule
            ],
    providers: [ProductoraService, EjemplarService, UbicacionService, RecursoDigitalService, RecursoTagService, TagService, FotoPortadaService, RecursoService, AutorService,TipoRecursoService,CategoriaRecursoService,EstadoService],
    declarations: [RegistroRecursoComponent]
})
export class RegistroRecursoModule {}
