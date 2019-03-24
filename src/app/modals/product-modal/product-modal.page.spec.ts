import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductModalPage } from './product-modal.page';

describe('ProductModalPage', () => {
  let component: ProductModalPage;
  let fixture: ComponentFixture<ProductModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
