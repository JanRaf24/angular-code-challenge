import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbService } from '@services/breadcrumb';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Mock breadcrumb data
const mockBreadcrumbs = [
  { label: 'List', url: '' },
  { label: 'Profile', url: ':1' },
];

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;
  let mockService: jasmine.SpyObj<BreadcrumbService>;

  beforeEach(async () => {
    const breadcrumbSpy = jasmine.createSpyObj('BreadcrumbService', [
      'getBreadcrumbs',
    ]);

    await TestBed.configureTestingModule({
      declarations: [BreadcrumbComponent],
      imports: [NoopAnimationsModule],
      providers: [{ provide: BreadcrumbService, useValue: breadcrumbSpy }],
      schemas: [NO_ERRORS_SCHEMA], // Skip unknown animation triggers
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    mockService = TestBed.inject(
      BreadcrumbService
    ) as jasmine.SpyObj<BreadcrumbService>;

    // Set up mock service response
    mockService.getBreadcrumbs.and.returnValue(of(mockBreadcrumbs));
  });

  it('should render elements with animation attributes in the DOM', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const zoomElement = fixture.debugElement.query(
      By.css('.separator')
    );
    expect(zoomElement.classes['ng-trigger-zoomIn']).toBeTruthy();

    const slideRightElement = fixture.debugElement.query(
      By.css('.breadcrumb-label')
    );
    expect(slideRightElement.classes['ng-trigger-slideInRight']).toBeTruthy();
  });

  it('should declare zoomInTrigger in component metadata', () => {
    const metadata = (BreadcrumbComponent as any).ɵcmp;
    const animationNames = metadata.data.animation?.map((a: any) => a.name);
    expect(animationNames).toContain('zoomIn');
  });

  it('should declare slideInRightTrigger in component metadata', () => {
    const metadata = (BreadcrumbComponent as any).ɵcmp;
    const animationNames = metadata.data.animation?.map((a: any) => a.name);
    expect(animationNames).toContain('slideInRight');
  });
});
