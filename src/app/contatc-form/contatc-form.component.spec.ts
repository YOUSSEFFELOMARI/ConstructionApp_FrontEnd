import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatcFormComponent } from './contatc-form.component';

describe('ContatcFormComponent', () => {
  let component: ContatcFormComponent;
  let fixture: ComponentFixture<ContatcFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContatcFormComponent]
    });
    fixture = TestBed.createComponent(ContatcFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
