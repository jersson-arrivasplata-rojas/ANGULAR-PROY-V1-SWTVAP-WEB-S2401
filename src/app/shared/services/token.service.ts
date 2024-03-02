import { Injectable } from '@angular/core';
import { AuthResponseInterface } from '../interfaces/auth-response.interface';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private localService: LocalService) { }

  public authLocal(): AuthResponseInterface | null {
    const authData = this.localService.getData('auth');
    return authData ? JSON.parse(authData) : null;
  }

  public tokenLocal(data: AuthResponseInterface | null): AuthResponseInterface | null {
    return (data && data.access_token && data.refresh_token) ? data : null;
  }

  public removeTokenLocal(): void {
    this.localService.removeData('auth');
  }
}
