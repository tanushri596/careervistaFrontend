import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { logInRouteGuard } from './log-in-route.guard';

describe('logInRouteGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => logInRouteGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
