import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCSNameComponent } from './update-csname.component';

describe('UpdateCSNameComponent', () => {
  let component: UpdateCSNameComponent;
  let fixture: ComponentFixture<UpdateCSNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCSNameComponent]
    });
    fixture = TestBed.createComponent(UpdateCSNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
