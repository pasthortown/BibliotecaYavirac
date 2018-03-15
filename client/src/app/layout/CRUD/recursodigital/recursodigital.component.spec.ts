import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RecursoDigitalComponent } from './recursodigital.component';

describe('RecursoDigitalComponent', () => {
   let component: RecursoDigitalComponent;
   let fixture: ComponentFixture<RecursoDigitalComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [ RecursoDigitalComponent ]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(RecursoDigitalComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});