import { TestBed } from '@angular/core/testing';

import { CommunicationserviceService } from './communicationservice.service';

describe('CommunicationserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommunicationserviceService = TestBed.get(CommunicationserviceService);
    expect(service).toBeTruthy();
  });
});
