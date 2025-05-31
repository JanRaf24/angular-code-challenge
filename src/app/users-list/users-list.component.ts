import {Component} from '@angular/core';
import {UserService} from 'src/app/services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class UsersListComponent {
  public readonly users$ = this.userService.getAll();

  constructor(private readonly userService: UserService) {
  }
}
