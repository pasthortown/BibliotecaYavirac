import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RecursoTagComponent } from './recursotag.component';

describe('RecursoTagComponent', () => {
   let component: RecursoTagComponent;
   let fixture: ComponentFixture<RecursoTagComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [ RecursoTagComponent ]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(RecursoTagComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});