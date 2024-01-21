import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { UserInterface as User } from 'src/app/shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class NodeUserService {


  private userSubject = new ReplaySubject<any>();

  constructor() { }

  setUser(data:User) {
    this.userSubject.next({
      user: data
    });
  }

  getUser(): Observable<any> {
    return this.userSubject.asObservable();
  }
}
