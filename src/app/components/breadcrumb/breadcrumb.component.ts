import { Component, Input, OnInit } from '@angular/core';
import { BreadcrumbService, Breadcrumb } from '@services/breadcrumb';
import { Observable } from 'rxjs';
import { slideInRightTrigger, zoomInTrigger } from '@animation-presets/index'

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  animations: [zoomInTrigger(), slideInRightTrigger()],
})
export class BreadcrumbComponent implements OnInit {
  @Input() separator: string = '>'; // Default separator

  public breadcrumbs$! : Observable<Breadcrumb[]>;

  constructor(private breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {
    this.breadcrumbs$ = this.breadcrumbService.getBreadcrumbs();
  }

}
