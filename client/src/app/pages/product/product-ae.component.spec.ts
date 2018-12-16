import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAeComponent } from './product-ae.component';

describe('ProductAeComponent', () => {
  let component: ProductAeComponent;
  let fixture: ComponentFixture<ProductAeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductAeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
