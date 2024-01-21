import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { CustomService } from './custom.service';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SlowComponentResolverService {


  constructor(private service: CustomService, @Inject(PLATFORM_ID) private platformId: any) { }

  public resolve(): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      return this.service.getSlow();
    }

    const watchdog: Observable<number> = timer(500);

    return Observable.create(subject => {
      this.service.getSlow().pipe(takeUntil(watchdog)).subscribe(response => {
        subject.next(response);
        subject.complete();
      });
      watchdog.subscribe(() => {
        subject.next(null);
        subject.complete();
      });
    });
  }
}
