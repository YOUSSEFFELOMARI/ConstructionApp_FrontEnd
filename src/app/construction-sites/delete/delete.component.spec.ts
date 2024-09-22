import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteComponentCS } from './delete.component';

describe('DeleteComponentCS', () => {
  let component: DeleteComponentCS;
  let fixture: ComponentFixture<DeleteComponentCS>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteComponentCS]
    });
    fixture = TestBed.createComponent(DeleteComponentCS);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
