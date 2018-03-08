import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EstadoRecursoComponent } from './estadorecurso.component';

describe('EstadoRecursoComponent', () => {
   let component: EstadoRecursoComponent;
   let fixture: ComponentFixture<EstadoRecursoComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [ EstadoRecursoComponent ]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(EstadoRecursoComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});