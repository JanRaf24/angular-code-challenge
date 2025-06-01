import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { UsersListComponent } from './users-list.component';
import { UserService } from '@services/user';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

// Mock UserData
const mockUsers = [
  {
    id: 1,
    name: 'Alice',
    bio: '## Bio', // not rendered
    profilePicture: 'http://example.com/alice.jpg',
  },
  {
    id: 2,
    name: 'Bob',
    bio: '## Bio', // not rendered
    profilePicture: 'http://example.com/bob.jpg',
  },
];

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', ['getAll']);

    await TestBed.configureTestingModule({
      imports: [UsersListComponent, NoopAnimationsModule, CommonModule],
      providers: [{ provide: UserService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should declare staggeredCardTrigger animation in metadata', () => {
    const metadata = (UsersListComponent as any).ɵcmp;
    const animationNames = metadata.data.animation?.map((a: any) => a.name);
    expect(animationNames).toContain('staggerCards');
  });

  it('should render user cards from users$ observable', fakeAsync(() => {
    userServiceSpy.getAll.and.returnValue(of(mockUsers)); // ✅ mock data

    fixture.detectChanges(); // ✅ triggers ngOnInit
    tick(); // ✅ flush observable
    fixture.detectChanges(); // ✅ update DOM

    const cards = fixture.debugElement.queryAll(By.css('.user-card'));
    expect(cards.length).toBe(2);
  }));

  it('should render users with name and profile picture', fakeAsync(() => {
    userServiceSpy.getAll.and.returnValue(of(mockUsers));

    fixture.detectChanges(); // triggers ngOnInit
    tick();
    fixture.detectChanges(); // process observable

    const userCards = fixture.debugElement.queryAll(By.css('.row'));
    expect(userCards.length).toBe(mockUsers.length);
    userCards.forEach((card, index) => {
      const nameEl = card.query(By.css('.card-title'));
      const imgEl = card.query(By.css('img'));

      expect(nameEl.nativeElement.textContent.trim()).toBe(
        mockUsers[index].name
      );
      expect(imgEl.attributes['src']).toBe(mockUsers[index].profilePicture);
    });
  }));

  it('should render container with animation binding', fakeAsync(() => {
    userServiceSpy.getAll.and.returnValue(of(mockUsers));

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const container = fixture.debugElement.query(By.css('.stagger-container'));
    expect(container.classes['ng-trigger-staggerCards']).toBeTruthy();
  }));
});
