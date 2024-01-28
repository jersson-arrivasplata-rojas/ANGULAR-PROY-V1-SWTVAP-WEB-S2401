import { Component, Inject, PLATFORM_ID } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import 'reflect-metadata';

@Component({
  selector: 'app-admin-base',
  templateUrl: './admin-base.component.html',
  styleUrls: ['./admin-base.component.scss'],
  providers: [],
})
export class AdminBaseComponent {
  public url: string;

  constructor(
    public activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) public platformId
  ) {}

  ngOnInit(): void {}
}
