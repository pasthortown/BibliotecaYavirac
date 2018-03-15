import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneradorEtiquetasComponent } from './generadorEtiquetas.component';

describe('GeneradorEtiquetasComponent', () => {
    let component: GeneradorEtiquetasComponent;
    let fixture: ComponentFixture<GeneradorEtiquetasComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [GeneradorEtiquetasComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(GeneradorEtiquetasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
