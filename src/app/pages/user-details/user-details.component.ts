import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/user';
import { MarkdownPipe } from "@pipes/markdown";
import { CommonModule } from '@angular/common';
import { catchError, Observable, of } from 'rxjs';
import { UserData } from '@model/index';
import { ActivatedRoute, Router } from '@angular/router';
import { isNumber } from '@utils/number';
import { fadeInUpTrigger } from '@animation-presets/index';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  standalone: true,
  imports: [CommonModule, MarkdownPipe],
  animations: [fadeInUpTrigger()]
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

    if(!isNumber(id)) {
      this.backToUserList();
      return;
    }

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
