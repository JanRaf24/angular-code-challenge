import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UserService } from './user.service';
import { UserPersistenceService } from './user-persistence.service';
import { UserData, NewUserData } from '@model/index';
import { of } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let persistenceSpy: jasmine.SpyObj<UserPersistenceService>;

  const mockUsers: UserData[] = [
    {
      id: 1,
      name: 'Alice',
      bio: '# Bio for Alice',
      profilePicture: 'http://example.com/alice.jpg',
    },
    {
      id: 2,
      name: 'Bob',
      bio: '## Bob bio',
      profilePicture: 'http://example.com/bob.jpg',
    },
  ];

  beforeEach(() => {
    const spy = jasmine.createSpyObj('UserPersistenceService', ['get', 'put']);

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: UserPersistenceService, useValue: spy },
      ],
    });

    service = TestBed.inject(UserService);
    persistenceSpy = TestBed.inject(
      UserPersistenceService
    ) as jasmine.SpyObj<UserPersistenceService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll()', () => {
    it('should return all users with delay', fakeAsync(() => {
      persistenceSpy.get.and.returnValue(mockUsers);

      let result: UserData[] = [];
      service.getAll().subscribe((users) => (result = users));

      tick(400); // simulate async delay
      expect(result).toEqual(mockUsers);
    }));
  });

  describe('findOneById()', () => {
    it('should return user with matching id', fakeAsync(() => {
      persistenceSpy.get.and.returnValue(mockUsers);

      let result: UserData | undefined;
      service.findOneById(2).subscribe((user) => (result = user));

      tick(400);
      expect(result).toEqual(mockUsers[1]);
    }));

    it('should throw error if user not found', fakeAsync(() => {
      persistenceSpy.get.and.returnValue(mockUsers);

      let error: any;
      service.findOneById(999).subscribe({
        error: (err) => (error = err),
      });

      tick(400);
      expect(error).toBeTruthy();
      expect(error.message).toContain('User with id 999 not found');
    }));
  });

  describe('create()', () => {
    it('should create a new user with incremented ID and store it', fakeAsync(() => {
      persistenceSpy.get.and.returnValue(mockUsers);

      const newUser: NewUserData = {
        name: 'Charlie',
        bio: 'New bio',
        profilePicture: 'http://example.com/charlie.jpg',
      };

      let createdUser: UserData | undefined;
      service.create(newUser).subscribe((user) => (createdUser = { ...user }));

      tick(400);

      expect(createdUser).toEqual({
        ...newUser,
        id: 3,
      });

      expect(persistenceSpy.put).toHaveBeenCalledWith([
        ...mockUsers,
        { ...newUser, id: 3 },
      ]);
    }));
  });
});
