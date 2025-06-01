import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/user';
import { CommonModule } from '@angular/common';
import { staggeredCardTrigger } from '@animation-presets/index';
import { Observable } from 'rxjs';
import { UserData } from '@model/user-data';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  standalone: true,
  imports: [CommonModule],
  animations: [staggeredCardTrigger()],
})
export class UsersListComponent implements OnInit{
  public users$!: Observable<UserData[]>;

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void{
    this.users$ = this.userService.getAll();
  }
}
