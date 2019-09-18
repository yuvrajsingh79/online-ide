import { TestBed } from '@angular/core/testing';

import { ServerHandlerService } from './server-handler.service';

describe('ServerHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerHandlerService = TestBed.get(ServerHandlerService);
    expect(service).toBeTruthy();
  });
});
