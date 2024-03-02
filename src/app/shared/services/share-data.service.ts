import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private shareDataBehaviorSubject = new BehaviorSubject<any>(null);

  constructor() { }

  // M\u00E9todo para enviar datos al BehaviorSubject
  add(data: any) {
    this.shareDataBehaviorSubject.next(data);
  }

  // M\u00E9todo para suscribirse al BehaviorSubject
  getData() {
    return this.shareDataBehaviorSubject.asObservable();
  }
}
