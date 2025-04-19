import { TestBed } from '@angular/core/testing';

import { CostEstimateService } from './cost-estimate.service';

describe('CostEstimateService', () => {
  let service: CostEstimateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostEstimateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
