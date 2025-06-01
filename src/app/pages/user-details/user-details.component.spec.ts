import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UserDetailsComponent } from './user-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { UserService } from '@services/user';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

// Mock user data
const mockUser = {
  id: 1,
  name: 'John Doe',
  bio: '## Markdown Bio',
  profilePicture: 'http://example.com/profile.jpg'
};

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const userSpy = jasmine.createSpyObj('UserService', ['findOneById']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [UserDetailsComponent, NoopAnimationsModule], // standalone component
      providers: [
        { provide: UserService, useValue: userSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should declare fadeInUpTrigger in the component metadata', () => {
    const metadata = (UserDetailsComponent as any).ɵcmp;
    const animationNames = metadata.data.animation?.map((a: any) => a.name);
    expect(animationNames).toContain('fadeInUp');
  });

  it('should render an element using fadeInUpTrigger animation', fakeAsync(() => {
    userServiceSpy.findOneById.and.returnValue(of(mockUser));
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    const fadeElement = fixture.debugElement.query(By.css('.container'));
    expect(fadeElement.classes['ng-trigger-fadeInUp']).toBeTruthy();
  }));

  it('should load user data based on route param and render name', fakeAsync(() => {
    userServiceSpy.findOneById.and.returnValue(of(mockUser));

    component.ngOnInit();
    tick();
    fixture.detectChanges();

    const nameEl = fixture.debugElement.query(By.css('.user-name'));
    expect(nameEl.nativeElement.textContent).toContain(mockUser.name);
  }));

  it('should render user\'s bio using MarkdownPipe', fakeAsync(() => {
    userServiceSpy.findOneById.and.returnValue(of(mockUser));

    component.ngOnInit();
    tick();
    fixture.detectChanges();

    const bioEl = fixture.debugElement.query(By.css('.user-bio'));
    expect(bioEl.nativeElement.innerHTML).toContain('<h2>'); // from markdown -> HTML
  }));
});

describe('UserDetailsComponent with invalid ID', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailsComponent, NoopAnimationsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'invalid-id' // ❌ Invalid
              }
            }
          }
        },
        {
          provide: UserService,
          useValue: jasmine.createSpyObj('UserService', ['findOneById'])
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate'])
        }
      ]
    }).compileComponents();
  });

  it('should redirect back to user\'s list if ID is invalid', fakeAsync(() => {
    const fixture = TestBed.createComponent(UserDetailsComponent);
    const router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
    tick();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  }));
});
