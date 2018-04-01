import { RolSecundario } from './../../../entidades/CRUD/RolSecundario';
import { LoginResult } from './../../../entidades/especifico/Login-Result';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isActive: boolean = false;
    showMenu: string = '';
    pushRightClass: string = 'push-right';
    username: string;
    rol: number;
    estudiante: Boolean;
    bibliotecario: Boolean;
    asistenteBiblioteca: Boolean;
    rolesSecundarios: RolSecundario[];

    constructor(private translate: TranslateService, public router: Router) {
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        const logedResult = JSON.parse(localStorage.getItem('logedResult')) as LoginResult;
        const personaLogeada = logedResult.persona;
        this.username = personaLogeada.nombre1 + ' ' + personaLogeada.nombre2 + ' ' + personaLogeada.apellido1 + ' ' + personaLogeada.apellido2;
        this.rol = logedResult.idRol;
        this.rolesSecundarios = JSON.parse(localStorage.getItem('rolesSecundarios')) as RolSecundario[];
        this.estudiante = false;
        this.bibliotecario = false;
        this.asistenteBiblioteca = false;
        this.activarPrivilegiosRol(this.rol);
        this.rolesSecundarios.forEach(rolSecundario => {
            this.activarPrivilegiosRol(rolSecundario.idRol);
        });
    }

    activarPrivilegiosRol(rol: number): void {
        if (rol == 2) {
            this.estudiante = true;
        }
        if (rol == 10) {
            this.bibliotecario = true;
        }
        if (rol == 11) {
            this.asistenteBiblioteca = true;
        }
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }
}
