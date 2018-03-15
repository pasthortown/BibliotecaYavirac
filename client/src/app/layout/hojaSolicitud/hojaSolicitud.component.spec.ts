import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HojaSolicitudComponent } from './hojaSolicitud.component';

describe('HojaSolicitudComponent', () => {
    let component: HojaSolicitudComponent;
    let fixture: ComponentFixture<HojaSolicitudComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [HojaSolicitudComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(HojaSolicitudComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
