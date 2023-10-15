import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCsiteComponent } from './update-csite.component';

describe('UpdateCsiteComponent', () => {
  let component: UpdateCsiteComponent;
  let fixture: ComponentFixture<UpdateCsiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCsiteComponent]
    });
    fixture = TestBed.createComponent(UpdateCsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
