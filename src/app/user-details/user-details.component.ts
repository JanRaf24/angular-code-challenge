import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MarkdownPipe } from "../pipes/markdown.pipe";
import { CommonModule } from '@angular/common';
import { catchError, Observable, of } from 'rxjs';
import { UserData } from 'src/model/user-data';
import { ActivatedRoute, Router } from '@angular/router';
import { isNumber } from 'src/utils/number';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  standalone: true,
  imports: [CommonModule, MarkdownPipe]
})
export class UserDetailsComponent implements OnInit{

  public user$!: Observable<UserData | null>;

  constructor(
    private readonly userService: UserService,
    private readonly activeRoute: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {

    const id = this.activeRoute.snapshot.paramMap.get('id')!;

    if(!isNumber(id)) this.backToUserList();

    this.user$ = this.userService.findOneById(Number(id)).pipe(
      catchError( error => {
        console.error('User fetch failed: ', error);
        this.backToUserList();
        return of(null);
      })
    );
  }

  private backToUserList(): void {
    this.router.navigate(['/']);
  }
} 
