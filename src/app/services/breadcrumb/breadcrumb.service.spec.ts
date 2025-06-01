import { TestBed } from '@angular/core/testing';
import { BreadcrumbService, Breadcrumb } from './breadcrumb.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {
  createMockRouteTree,
  createMockRouter,
  simulateNavigation,
} from '@utils/test';

describe('BreadcrumbService (List and Profile Routes)', () => {
  let service: BreadcrumbService;
  let events$: BehaviorSubject<any>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    events$ = new BehaviorSubject<any>(null);

    // Default to root route — can be overridden in each test
    const initialRouteTree = createMockRouteTree([
      { path: '', label: 'Users' },
    ]);

    mockRouter = createMockRouter(events$, initialRouteTree);

    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: mockRouter }, BreadcrumbService],
    });

    service = TestBed.inject(BreadcrumbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit breadcrumb for List route only ("")', (done) => {
    const routeTree = createMockRouteTree([{ path: '', label: 'List' }]);

    (mockRouter.routerState.snapshot as any).root = routeTree;

    simulateNavigation(events$, '');

    service.getBreadcrumbs().subscribe((breadcrumbs: Breadcrumb[]) => {
      expect(breadcrumbs).toEqual([{ label: 'List', url: '' }]);
      done();
    });
  });

  it('should emit breadcrumbs for List and Profile ("/123")', (done) => {
    const routeTree = createMockRouteTree([
      { path: '', label: 'List' },
      { path: ':id', label: 'Profile', params: { id: '123' } },
    ]);

    (mockRouter.routerState.snapshot as any).root = routeTree;

    simulateNavigation(events$, '/123');

    service.getBreadcrumbs().subscribe((breadcrumbs: Breadcrumb[]) => {
      expect(breadcrumbs).toEqual([
        { label: 'List', url: '' },
        { label: 'Profile', url: '/123' },
      ]);
      done();
    });
  });

  it('should remove duplicate breadcrumbs with the same label and url', (done) => {
    const routeTree = createMockRouteTree([
      { path: '', label: 'List' },
      { path: '', label: 'List' },
    ]);

    (mockRouter.routerState.snapshot as any).root = routeTree;

    simulateNavigation(events$, '/');

    service.getBreadcrumbs().subscribe((breadcrumbs: Breadcrumb[]) => {
      expect(breadcrumbs.length).toBe(1);
      expect(breadcrumbs[0]).toEqual({
        label: 'List',
        url: '',
      });
      done();
    });
  });
});
