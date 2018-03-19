import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FotoPortadaComponent } from './fotoportada.component';

describe('FotoPortadaComponent', () => {
   let component: FotoPortadaComponent;
   let fixture: ComponentFixture<FotoPortadaComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [ FotoPortadaComponent ]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(FotoPortadaComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});