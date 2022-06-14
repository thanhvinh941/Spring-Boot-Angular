import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDetailComponentComponent } from './cart-detail-component.component';

describe('CartDetailComponentComponent', () => {
  let component: CartDetailComponentComponent;
  let fixture: ComponentFixture<CartDetailComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartDetailComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
