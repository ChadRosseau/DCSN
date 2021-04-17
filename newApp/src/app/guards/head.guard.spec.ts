import { TestBed } from '@angular/core/testing';

import { HeadGuard } from './head.guard';

describe('HeadGuard', () => {
  let guard: HeadGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HeadGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
