// src/testing/test-utils.ts

import { NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

/**
 * Builds a fake route snapshot tree matching Angular structure,
 * with optional label, path, and route params.
 */
export function createMockRouteTree(
  breadcrumbs: { path: string; label?: string; params?: Record<string, any> }[]
): any {
  let current: any = null;

  for (let i = breadcrumbs.length - 1; i >= 0; i--) {
    const { path, label, params = {} } = breadcrumbs[i];

    const route: any = {
      url: [],
      params,
      data: label ? { breadcrumb: label } : {},
      routeConfig: { path },
      firstChild: current,
      queryParams: {},
      fragment: '',
      component: null,
      outlet: '',
      children: [],
      pathFromRoot: [],
      paramMap: null,
      queryParamMap: null,
      toString: () => ''
    };

    current = route;
  }

  return current;
}

/**
 * Emits a NavigationEnd event to simulate navigation.
 */
export function simulateNavigation(events$: BehaviorSubject<any>, url: string): void {
  events$.next(new NavigationEnd(Date.now(), url, url));
}

/**
 * Creates a fully mocked Router with overridable route tree.
 */
export function createMockRouter(events$: BehaviorSubject<any>, root: any) {
  return jasmine.createSpyObj('Router', ['navigate'], {
    events: events$.asObservable(),
    routerState: {
      snapshot: {
        root
      }
    }
  });
}
