import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSolicitudesComponent } from './gestionSolicitudes.component';

describe('GestionSolicitudesComponent', () => {
    let component: GestionSolicitudesComponent;
    let fixture: ComponentFixture<GestionSolicitudesComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [GestionSolicitudesComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(GestionSolicitudesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
