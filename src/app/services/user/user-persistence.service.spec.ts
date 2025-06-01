import { UserPersistenceService } from './user-persistence.service';
import { UserData } from '@model/index';

describe('UserPersistenceService', () => {
  let service: UserPersistenceService;
  const STORAGE_KEY = 'users';

  const mockUsers: UserData[] = [
    {
      id: 42,
      name: 'Test User',
      bio: 'Test Bio',
      profilePicture: '/assets/img/test.jpg'
    }
  ];

  beforeEach(() => {
    service = new UserPersistenceService();
    sessionStorage.clear(); // ✅ reset between tests
  });

  describe('put()', () => {
    it('should store data in sessionStorage as JSON', () => {
      service.put(mockUsers);

      const stored = sessionStorage.getItem(STORAGE_KEY);
      expect(stored).toBe(JSON.stringify(mockUsers));
    });
  });

  describe('get()', () => {
    it('should return parsed data from sessionStorage', () => {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(mockUsers));

      const result = service.get();
      expect(result).toEqual(mockUsers);
    });

    it('should return INITIAL_DATA if sessionStorage is empty', () => {
      sessionStorage.removeItem(STORAGE_KEY);

      const result = service.get();
      expect(result.length).toBeGreaterThan(0);
      expect(result.some((u) => u.name === 'Alice')).toBeTrue(); // from INITIAL_DATA
    });

    it('should return INITIAL_DATA if data is not JSON', () => {
      spyOn(console, 'error'); // ✅ prevent logging SyntaxError
      sessionStorage.setItem(STORAGE_KEY, 'not-json');

      const result = service.get();
      expect(result.some((u) => u.name === 'Alice')).toBeTrue();
    });

    it('should return INITIAL_DATA if JSON is not an array', () => {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ id: 1 }));

      const result = service.get();
      expect(Array.isArray(result)).toBeTrue();
      expect(result.some((u) => u.name === 'Alice')).toBeTrue();
    });
  });
});
