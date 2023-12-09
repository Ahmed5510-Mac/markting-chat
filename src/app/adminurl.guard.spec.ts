import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminurlGuard } from './guard/adminurl.guard';

describe('adminurlGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => adminurlGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
