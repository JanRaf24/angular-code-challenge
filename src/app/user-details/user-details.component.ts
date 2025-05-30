import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { MarkdownPipe } from "../pipes/markdown.pipe";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  standalone: true,
  imports: [CommonModule, MarkdownPipe]
})
export class UserDetailsComponent {

  public readonly user$ = this.userService.findOneById(1);

  constructor(private readonly userService: UserService) { }

}
