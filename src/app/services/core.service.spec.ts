import { TestBed, inject } from '@angular/core/testing';

import { CoreService } from './core.service';

describe('coreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [coreService]
    });
  });

  it('should be created', inject([coreService], (service: coreService) => {
    expect(service).toBeTruthy();
  }));
});
