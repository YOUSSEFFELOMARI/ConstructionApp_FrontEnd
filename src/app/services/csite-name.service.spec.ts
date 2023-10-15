import { TestBed } from '@angular/core/testing';

import { CSiteNameService } from './csite-name.service';

describe('CSiteNameService', () => {
  let service: CSiteNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CSiteNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
