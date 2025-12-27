import { TestBed } from '@angular/core/testing';

import { SessionGateService } from './session-gate-service';

describe('SessionGateService', () => {
  let service: SessionGateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionGateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
