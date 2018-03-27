import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DescargaRecursoDigitalComponent } from './descargarecursodigital.component';

describe('DescargaRecursoDigitalComponent', () => {
   let component: DescargaRecursoDigitalComponent;
   let fixture: ComponentFixture<DescargaRecursoDigitalComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [ DescargaRecursoDigitalComponent ]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(DescargaRecursoDigitalComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});