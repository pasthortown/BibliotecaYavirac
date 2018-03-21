import { Recurso } from './../entidades/CRUD/Recurso';
import { Persona } from '../entidades/CRUD/Persona';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { LoginRequest } from './../entidades/especifico/Login-Request';
import { LoginResult } from './../entidades/especifico/Login-Result';
import { LoginService } from './login.service';

import 'rxjs/add/operator/toPromise';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { stringify } from 'querystring';
import { RolSecundario } from './../entidades/CRUD/RolSecundario';
import { RolSecundarioService } from './../layout/CRUD/externos/rolsecundario.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    busy: Promise<any>;
    loginEntidad: LoginRequest;
    rolesSecundarios: RolSecundario[];
    recursosSolicitados: Recurso[];

    constructor(private rolesSecundariosDataService: RolSecundarioService,
        public router: Router,
        vcr: ViewContainerRef,
        public toastr: ToastsManager,
        private dataService: LoginService) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.loginEntidad = this.crearEntidad();
    }

    crearEntidad(): LoginRequest {
        const loginEntidad = new LoginRequest();
        loginEntidad.email = '';
        loginEntidad.clave = '';
        return loginEntidad;
    }

    onLoggedin() {
        this.login(this.loginEntidad);
    }

    login(datosLogin: LoginRequest): void {
        this.busy = this.dataService.cuenta(datosLogin)
        .then(respuesta => {
            if (respuesta.idRol === 0) {
                this.toastr.warning('Credenciales Incorrectos', 'Autenticar');
                localStorage.setItem('isLoggedin', 'false');
                this.router.navigate(['/login']);
            } else {
                localStorage.setItem('isLoggedin', 'true');
                localStorage.setItem('logedResult', JSON.stringify(respuesta));
                localStorage.setItem('recursosSolicitados', JSON.stringify(this.recursosSolicitados));
                this.getRolesSecundarios(respuesta.persona.id);
            }
        })
        .catch(error => {
           this.toastr.warning('Ocurrió un error', 'Autenticar');
        });
    }

    getRolesSecundarios(idPersona: number): void {
        this.busy = this.rolesSecundariosDataService.getFiltrado('idPersona', 'coincide', idPersona.toString())
        .then(respuesta => {
            this.rolesSecundarios = respuesta;
            localStorage.setItem('rolesSecundarios', JSON.stringify(this.rolesSecundarios));
            this.router.navigate(['/dashboard']);
        })
        .catch(error => {

        });
    }

}
