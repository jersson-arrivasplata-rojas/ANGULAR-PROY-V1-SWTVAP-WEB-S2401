import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttp } from 'src/app/shared/http/auth.http';
import { LocalService } from 'src/app/shared/services/local.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'swtvap-admin-dashboard-base',
  templateUrl: './admin-dashboard-base.component.html',
  styleUrls: ['./admin-dashboard-base.component.css'],
})
export class AdminDashboardBaseComponent {
  public APP_URL = environment.apiUrl;
  public assetUrl = environment.assetUrl;
  public dropdownActive = false;
  constructor(@Inject(PLATFORM_ID) public platformId,
    private authHttp: AuthHttp,
    private localService: LocalService,
    private router: Router) { }

  menuToggle(e) {
    e.preventDefault();
    let element = document.querySelector('#wrapper');
    let bdSidenavAdminDashboardPrincipal = document.querySelector(
      '#bd-sidenav-admin-dashboard-principal'
    );

    element.classList.toggle('toggled');
    bdSidenavAdminDashboardPrincipal.classList.remove('d-none');
    bdSidenavAdminDashboardPrincipal.classList.remove('d-block');

    if (element.classList.contains('toggled') == true) {
    } else {
      bdSidenavAdminDashboardPrincipal.classList.add('d-block');
    }
  }

  dropdown(element){
    this.dropdownActive = !this.dropdownActive;//'drop-down--active'
  }

  getType() {
    return this.localService.getData('token');
  }

  getImagePrincipal() {
    return `${this.assetUrl}100x100`;
  }

  logout() {
    this.router.navigate(['/auth/logout']);
  }
}
