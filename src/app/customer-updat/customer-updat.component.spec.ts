import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUpdatComponent } from './customer-updat.component';

describe('CustomerUpdatComponent', () => {
  let component: CustomerUpdatComponent;
  let fixture: ComponentFixture<CustomerUpdatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerUpdatComponent]
    });
    fixture = TestBed.createComponent(CustomerUpdatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
