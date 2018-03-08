import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductoraComponent } from './productora.component';

describe('ProductoraComponent', () => {
   let component: ProductoraComponent;
   let fixture: ComponentFixture<ProductoraComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [ ProductoraComponent ]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(ProductoraComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});