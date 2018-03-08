import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComentariosSugerenciasComponent } from './comentariossugerencias.component';

describe('ComentariosSugerenciasComponent', () => {
   let component: ComentariosSugerenciasComponent;
   let fixture: ComponentFixture<ComentariosSugerenciasComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [ ComentariosSugerenciasComponent ]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(ComentariosSugerenciasComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});