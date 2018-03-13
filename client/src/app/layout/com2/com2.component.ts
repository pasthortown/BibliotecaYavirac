import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-com2',
    templateUrl: './com2.component.html',
    styleUrls: ['./com2.component.scss']
})
export class com2Component implements OnInit {
    constructor() {}
    ngOnInit() {}
    NumCom = 0;
    ReseñaR = 'Reseña';
    TituloR= '---';
    EdicionR = '--';
    ISBNR= '------';
    TipoR = '---';
    FechaC = '---';
    LinkUsuario = '-------';
}

export class Libros{
    public LLibros =["García Marquez","Bioshock","Rapture"];
}