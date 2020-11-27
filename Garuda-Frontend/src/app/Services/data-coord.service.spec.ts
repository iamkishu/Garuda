import { TestBed } from '@angular/core/testing';

import { DataCoordService } from './data-coord.service';

describe('DataCoordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataCoordService = TestBed.get(DataCoordService);
    expect(service).toBeTruthy();
  });
});
