import { TestBed } from '@angular/core/testing';

import { CallingService } from './calling.service';

describe('CallingService', () => {
  let service: CallingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
