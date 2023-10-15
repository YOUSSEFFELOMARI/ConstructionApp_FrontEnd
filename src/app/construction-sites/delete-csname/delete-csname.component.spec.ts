import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCSNameComponent } from './delete-csname.component';

describe('DeleteCSNameComponent', () => {
  let component: DeleteCSNameComponent;
  let fixture: ComponentFixture<DeleteCSNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteCSNameComponent]
    });
    fixture = TestBed.createComponent(DeleteCSNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
