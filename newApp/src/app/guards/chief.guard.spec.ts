import { TestBed } from '@angular/core/testing';

import { ChiefGuard } from './chief.guard';

describe('ChiefGuard', () => {
  let guard: ChiefGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChiefGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
