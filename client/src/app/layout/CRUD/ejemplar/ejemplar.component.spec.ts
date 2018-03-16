import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EjemplarComponent } from './ejemplar.component';

describe('EjemplarComponent', () => {
   let component: EjemplarComponent;
   let fixture: ComponentFixture<EjemplarComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [ EjemplarComponent ]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(EjemplarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});