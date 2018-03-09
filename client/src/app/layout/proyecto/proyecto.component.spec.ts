import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { proyectoComponent } from './proyecto.component';

describe('proyectoComponent', () => {
    let component: proyectoComponent;
    let fixture: ComponentFixture<proyectoComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [proyectoComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(proyectoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
