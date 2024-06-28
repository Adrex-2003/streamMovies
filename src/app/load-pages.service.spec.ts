import { TestBed } from '@angular/core/testing';

import { LoadPagesService } from './load-pages.service';

describe('LoadPagesService', () => {
  let service: LoadPagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadPagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
});
