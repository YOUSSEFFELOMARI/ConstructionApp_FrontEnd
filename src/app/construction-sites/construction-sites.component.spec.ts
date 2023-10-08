import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionSitesComponent } from './construction-sites.component';

describe('ConstructionSitesComponent', () => {
  let component: ConstructionSitesComponent;
  let fixture: ComponentFixture<ConstructionSitesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConstructionSitesComponent]
    });
    fixture = TestBed.createComponent(ConstructionSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
