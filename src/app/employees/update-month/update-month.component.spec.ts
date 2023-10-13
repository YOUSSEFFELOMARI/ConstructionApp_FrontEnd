import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMonthComponent } from './update-month.component';

describe('UpdateMonthComponent', () => {
  let component: UpdateMonthComponent;
  let fixture: ComponentFixture<UpdateMonthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateMonthComponent]
    });
    fixture = TestBed.createComponent(UpdateMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
