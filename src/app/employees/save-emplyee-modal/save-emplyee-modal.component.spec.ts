import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveEmplyeeModalComponent } from './save-emplyee-modal.component';

describe('SaveEmplyeeModalComponent', () => {
  let component: SaveEmplyeeModalComponent;
  let fixture: ComponentFixture<SaveEmplyeeModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveEmplyeeModalComponent]
    });
    fixture = TestBed.createComponent(SaveEmplyeeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
