import { Component, Input, OnInit } from '@angular/core';
import { BreadcrumbService, Breadcrumb } from '../services/breadcrumb/breadcrumb.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() separator: string = '>'; // Default separator

  public breadcrumbs$! : Observable<Breadcrumb[]>;

  constructor(private breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {
    this.breadcrumbs$ = this.breadcrumbService.getBreadcrumbs();
    this.breadcrumbService.getBreadcrumbs().subscribe(bc => console.log(bc))
  }

}
