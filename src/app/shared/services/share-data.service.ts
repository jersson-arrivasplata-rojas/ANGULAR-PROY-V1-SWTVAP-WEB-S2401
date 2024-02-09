import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private shareDataBehaviorSubject = new BehaviorSubject<any>(null);

  constructor() { }

  // Método para enviar datos al BehaviorSubject
  add(data: any) {
    this.shareDataBehaviorSubject.next(data);
  }

  // Método para suscribirse al BehaviorSubject
  getData() {
    return this.shareDataBehaviorSubject.asObservable();
  }
}
