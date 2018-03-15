import { LoginResult } from './../../entidades/especifico/Login-Result';
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
// SERVICIOS
import { PersonaService } from './../CRUD/externos/persona.service';
import { GeneroService } from './../CRUD/externos/genero.service';
import { EtniaService } from './../CRUD/externos/etnia.service';
import { TipoIngresosService } from './../CRUD/externos/tipoingresos.service';
import { OcupacionService } from './../CRUD/externos/ocupacion.service';
import { TipoDiscapacidadService } from './../CRUD/externos/tipodiscapacidad.service';
import { TipoSangreService } from './../CRUD/externos/tiposangre.service';
import { EstadoCivilService } from './../CRUD/externos/estadocivil.service';
import { TituloService } from './../CRUD/externos/titulo.service';
import { EstudianteService } from './../CRUD/externos/estudiante.service';
import { TipoInstitucionProcedenciaService } from './../CRUD/externos/tipoinstitucionprocedencia.service';
import { NivelTituloService } from './../CRUD/externos/niveltitulo.service';
import { UbicacionService } from './../CRUD/externos/ubicacion.service';
import { FotoPerfilService } from './../CRUD/externos/fotoperfil.service';
import { Persona } from './../../entidades/CRUD/Persona';
import { Genero } from './../../entidades/CRUD/Genero';
import { Etnia } from './../../entidades/CRUD/Etnia';
import { TipoIngresos } from './../../entidades/CRUD/TipoIngresos';
import { Ocupacion } from './../../entidades/CRUD/Ocupacion';
import { TipoDiscapacidad } from './../../entidades/CRUD/TipoDiscapacidad';
import { TipoSangre } from './../../entidades/CRUD/TipoSangre';
import { EstadoCivil } from './../../entidades/CRUD/EstadoCivil';
import { Titulo } from './../../entidades/CRUD/Titulo';
import { TipoInstitucionProcedencia } from './../../entidades/CRUD/TipoInstitucionProcedencia';
import { NivelTitulo } from './../../entidades/CRUD/NivelTitulo';
import { Ubicacion } from './../../entidades/CRUD/Ubicacion';
import { Estudiante } from './../../entidades/CRUD/Estudiante';
import { FotoPerfil } from './../../entidades/CRUD/FotoPerfil';
@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
    @ViewChild('fileInput') fileInput;
    busy: Promise<any>;
    srcFoto: string;
    personaLogeada: Persona;
    rol: number;
    estudiante: Estudiante;
    generos: Genero[] = [];
    etnias: Etnia[] = [];
    tiposIngresos: TipoIngresos[] = [];
    tiposSangre: TipoSangre[] = [];
    estadosCivil: EstadoCivil[] = [];
    titulos: Titulo[] = [];
    tiposInstitucionProcedencia: TipoInstitucionProcedencia[] = [];
    nivelesTitulo: NivelTitulo[] = [];
    ubicaciones: Ubicacion[] = [];
    paises: Ubicacion[] = [];
    provinciasDomicilio: Ubicacion[] = [];
    cantonesDomicilio: Ubicacion[] = [];
    parroquiasDomicilio: Ubicacion[] = [];
    provinciasNacimiento: Ubicacion[] = [];
    cantonesNacimiento: Ubicacion[] = [];
    parroquiasNacimiento: Ubicacion[] = [];
    ocupaciones: Ocupacion[] = [];
    tiposDiscapacidad: TipoDiscapacidad[] = [];
    tieneDiscapacidad: Boolean;
    esEstudiante: Boolean;
    fotoNombre: string;
    fotoType: string;
    fotoFile: string;
    constructor(public toastr: ToastsManager, vcr: ViewContainerRef,
        private personaDataService: PersonaService,
        private generoDataService: GeneroService,
        private estadoCivilDataService: EstadoCivilService,
        private etniaDataService: EtniaService,
        private tipoSangreDataService: TipoSangreService,
        private ingresosDataService: TipoIngresosService,
        private ocupacionDataService: OcupacionService,
        private tipoDiscapacidadDataService: TipoDiscapacidadService,
        private ubicacionDataService: UbicacionService,
        private nivelTituloDataService: NivelTituloService,
        private estudianteDataService: EstudianteService,
        private tipoInstitucionProcedenciaService: TipoInstitucionProcedenciaService,
        private fotoPerfilDataService: FotoPerfilService) {
            this.toastr.setRootViewContainerRef(vcr);
    }

    CodificarArchivo(event) {
        const reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.fotoNombre = file.name;
                this.fotoType = file.type;
                this.fotoFile = reader.result.split(',')[1];
                this.srcFoto = 'data:' + this.fotoType + ';base64,' + this.fotoFile;
            };
        }
    }

    ngOnInit() {
        this.esEstudiante = false;
        this.estudiante = new Estudiante();
        this.tieneDiscapacidad = false;
        const logedResult = JSON.parse(localStorage.getItem('logedResult')) as LoginResult;
        this.personaLogeada = logedResult.persona;
        this.rol = logedResult.idRol;
        this.busy = this.generoDataService.getAll()
        .then(respuesta => {
            this.generos = respuesta;
        })
        .catch(error => {

        });
        this.busy = this.estadoCivilDataService.getAll()
        .then(respuesta => {
            this.estadosCivil = respuesta;
        })
        .catch(error => {

        });
        this.busy = this.etniaDataService.getAll()
        .then(respuesta => {
            this.etnias = respuesta;
        })
        .catch(error => {

        });
        this.busy = this.tipoSangreDataService.getAll()
        .then(respuesta => {
            this.tiposSangre = respuesta;
        })
        .catch(error => {

        });
        this.busy = this.ingresosDataService.getAll()
        .then(respuesta => {
            this.tiposIngresos = respuesta;
        })
        .catch(error => {

        });
        this.busy = this.ocupacionDataService.getAll()
        .then(respuesta => {
            this.ocupaciones = respuesta;
        })
        .catch(error => {

        });
        this.busy = this.tipoDiscapacidadDataService.getAll()
        .then(respuesta => {
            this.tiposDiscapacidad = respuesta;
        })
        .catch(error => {

        });
        this.busy = this.ubicacionDataService.getAll()
        .then(respuesta => {
            this.ubicaciones = respuesta;
            this.paises = [];
            this.ubicaciones.forEach(element => {
                if (element.codigoPadre == null) {
                    this.paises.push(element);
                }
            });
            this.getProvinciasDomicilio();
            this.getCantonesDomicilio();
            this.getParroquiasDomicilio();
            this.getProvinciasNacimiento();
            this.getCantonesNacimiento();
            this.getParroquiasNacimiento();
        })
        .catch(error => {

        });
        this.busy = this.nivelTituloDataService.getAll()
        .then(respuesta => {
            this.nivelesTitulo = respuesta;
        })
        .catch(error => {

        });
        this.busy = this.tipoInstitucionProcedenciaService.getAll()
        .then(respuesta => {
            this.tiposInstitucionProcedencia = respuesta;
        })
        .catch(error => {

        });
        if (this.personaLogeada.carnetConadis === 'true') {
            this.tieneDiscapacidad = true;
        } else {
            this.tieneDiscapacidad = false;
        }
        if (this.rol === 2 || this.rol === 6) {
            this.esEstudiante = true;
            this.busy = this.estudianteDataService.getFiltrado('idPersona', 'coincide', this.personaLogeada.id.toString())
            .then(respuesta => {
                this.estudiante = respuesta[0];
            })
            .catch(error => {
                // Error
            });
        } else {
            this.esEstudiante = false;
        }
        this.getFotoPerfil();
    }

    getProvinciasDomicilio() {
        this.provinciasDomicilio = [];
        this.ubicaciones.forEach(element => {
            if (element.codigoPadre === this.personaLogeada.idUbicacionDomicilioPais) {
                this.provinciasDomicilio.push(element);
            }
        });
    }

    cancelar(): void {
        this.toastr.warning('Los cambios fueron descartados', 'Actualización');
        this.ngOnInit();
    }

    getCantonesDomicilio() {
        this.cantonesDomicilio = [];
        this.ubicaciones.forEach(element => {
            if (element.codigoPadre === this.personaLogeada.idUbicacionDomicilioProvincia) {
                this.cantonesDomicilio.push(element);
            }
        });
    }

    getParroquiasDomicilio() {
        this.parroquiasDomicilio = [];
        this.ubicaciones.forEach(element => {
            if (element.codigoPadre === this.personaLogeada.idUbicacionDomicilioCanton) {
                this.parroquiasDomicilio.push(element);
            }
        });
    }

    getProvinciasNacimiento() {
        this.provinciasNacimiento = [];
        this.ubicaciones.forEach(element => {
            if (element.codigoPadre === this.personaLogeada.idUbicacionNacimientoPais) {
                this.provinciasNacimiento.push(element);
            }
        });
    }

    getCantonesNacimiento() {
        this.cantonesNacimiento = [];
        this.ubicaciones.forEach(element => {
            if (element.codigoPadre === this.personaLogeada.idUbicacionNacimientoProvincia) {
                this.cantonesNacimiento.push(element);
            }
        });
    }

    getParroquiasNacimiento() {
        this.parroquiasNacimiento = [];
        this.ubicaciones.forEach(element => {
            if (element.codigoPadre === this.personaLogeada.idUbicacionNacimientoCanton) {
                this.parroquiasNacimiento.push(element);
            }
        });
    }

    TieneDiscapacidad() {
        if (this.tieneDiscapacidad) {
            this.tieneDiscapacidad = false;
            this.personaLogeada.carnetConadis = 'false';
        } else {
            this.tieneDiscapacidad = true;
            this.personaLogeada.carnetConadis = 'true';
        }

    }

    getFotoPerfil() {
        this.srcFoto = './../../../../assets/images/user.png';
        this.busy = this.fotoPerfilDataService.getFiltrado('idPersona', 'coincide' , this.personaLogeada.id.toString())
        .then(respuesta => {
            if ( JSON.stringify(respuesta) == '[0]' ) {
                return;
            }
            this.fotoFile = respuesta[0].adjunto;
            this.fotoNombre = respuesta[0].nombreArchivo;
            this.fotoType = respuesta[0].tipoArchivo;
            this.srcFoto = 'data:' + this.fotoType + ';base64,' + this.fotoFile;
        })
        .catch(error => {
            this.toastr.warning('Se produjo un error', 'Actualización');
        });
    }

    actualizarFoto() {
        const fotoPerfil = new FotoPerfil();
        fotoPerfil.adjunto = this.fotoFile;
        fotoPerfil.nombreArchivo = this.fotoNombre;
        fotoPerfil.tipoArchivo = this.fotoType;
        fotoPerfil.idPersona = this.personaLogeada.id;
        this.busy = this.fotoPerfilDataService.update(fotoPerfil)
        .then(respuesta => {
            if (respuesta) {
                localStorage.removeItem('logedResult');
                const newLogResult = new LoginResult();
                newLogResult.idRol = this.rol;
                newLogResult.persona = this.personaLogeada;
                localStorage.setItem('logedResult', JSON.stringify(newLogResult));
                this.toastr.success('La actualización fue exitosa', 'Actualización');
            } else {
                this.toastr.warning('Se produjo un error', 'Actualización');
            }
            this.ngOnInit();
        })
        .catch(error => {
            this.toastr.warning('Se produjo un error', 'Actualización');
        });
    }

   update(): void {
        this.busy = this.personaDataService.update(this.personaLogeada)
        .then(respuesta => {
            if (respuesta) {
                this.actualizarFoto();
            } else {
                this.toastr.warning('Se produjo un error', 'Actualización');
            }
        })
        .catch(error => {
            this.toastr.warning('Se produjo un error', 'Actualización');
        });
    }
}
