import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroRecursoComponent } from './registroRecurso.component';

describe('RegistroRecursoComponent', () => {
    let component: RegistroRecursoComponent;
    let fixture: ComponentFixture<RegistroRecursoComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [RegistroRecursoComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(RegistroRecursoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
