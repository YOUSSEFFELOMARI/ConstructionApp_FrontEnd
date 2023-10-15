import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveCSNameComponent } from './save-csname.component';

describe('SaveCSNameComponent', () => {
  let component: SaveCSNameComponent;
  let fixture: ComponentFixture<SaveCSNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveCSNameComponent]
    });
    fixture = TestBed.createComponent(SaveCSNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
