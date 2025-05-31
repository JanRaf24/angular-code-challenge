import {Injectable} from '@angular/core';
import {map, Observable, of} from 'rxjs';
import {UserData, NewUserData} from 'src/model';
import {UserPersistenceService} from './user-persistence.service';
import {randomDelay} from 'src/utils/rxjs';


@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private readonly userPersistenceService: UserPersistenceService) {
  }

  public getAll(): Observable<UserData[]> {
    return of(this.userPersistenceService.get()).pipe(randomDelay());
  }

  public findOneById(id: number): Observable<UserData> {
    return this.getAll().pipe(
      map(all => {
        const user = all.find(it => it.id === id);
        if (user) {
          return user;
        }
        throw new Error(`User with id ${id} not found`);
      })
    );
  }

  public create(userData: NewUserData): Observable<UserData> {
    const users = this.userPersistenceService.get();
    const maxId = users.reduce((max, it) => Math.max(max, it.id), Number.MIN_SAFE_INTEGER);
    const id = maxId + 1;
    const user: UserData = {...userData, id};
    this.userPersistenceService.put([...users, user]);
    return of(user).pipe(randomDelay());
  }

}
