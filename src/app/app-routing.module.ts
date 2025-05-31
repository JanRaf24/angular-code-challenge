import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from '@pages/users-list/users-list.component';
import { UserDetailsComponent } from '@pages/user-details/user-details.component';

const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'List' },
    children: [
      {
        path: '',
        component: UsersListComponent,
      },
      {
        path: ':id',
        component: UserDetailsComponent,
        data: { breadcrumb: 'Profile' },
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
