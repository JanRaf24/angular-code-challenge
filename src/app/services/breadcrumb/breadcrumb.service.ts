import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
import { removeDuplicates } from 'src/utils/array';

export interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const root = this.router.routerState.snapshot.root;
        const breadcrumbs = this.buildBreadcrumbs(root);
        this.breadcrumbs$.next(breadcrumbs);
      });
  }

  getBreadcrumbs() {
    return this.breadcrumbs$.asObservable();
  }

  private buildBreadcrumbs(
    route: ActivatedRouteSnapshot,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const routeConfig = route.routeConfig;

    // Build URL from actual path (replace params)
    if (routeConfig && routeConfig.path) {
      const segment = routeConfig.path
        .split('/')
        .map((part) =>
          part.startsWith(':') ? route.params[part.substring(1)] : part
        )
        .join('/');

      url += `/${segment}`;
      url = url.replace(/\/\/+/g, '/');
    }

    // ✅ Include breadcrumb if present in data (regardless of path or nesting)
    if (route.data?.['breadcrumb']) {
      breadcrumbs.push({
        label: route.data['breadcrumb'],
        url,
      });
    }

    // Recurse into first activated child
    if (route.firstChild) {
      return this.buildBreadcrumbs(route.firstChild, url, breadcrumbs);
    }

    return removeDuplicates(breadcrumbs, bd => `${bd.label}|${bd.url}`);
  }
}
