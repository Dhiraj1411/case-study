import { TestBed, inject } from '@angular/core/testing';

import { FindJobService } from './find-job.service';

describe('FindJobService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FindJobService]
    });
  });

  it('should be created', inject([FindJobService], (service: FindJobService) => {
    expect(service).toBeTruthy();
  }));
});
