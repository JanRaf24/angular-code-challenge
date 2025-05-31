import {Component} from '@angular/core';
import {UserService} from 'src/app/services/user/user.service';
import { CommonModule } from '@angular/common';
import { staggeredCardTrigger } from 'src/app/animations';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  standalone: true,
  imports: [CommonModule],
  animations: [staggeredCardTrigger()]
})
export class UsersListComponent {
  public readonly users$ = this.userService.getAll();

  constructor(private readonly userService: UserService) {
  }
}
