import { Component } from '@angular/core';
import { ExampleService } from 'src/app/shared/services/example.service';

@Component({
  selector: 'swtvap-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.scss'
  ]
})
export class LoginComponent {

  constructor(private exampleService:ExampleService) { }

  login() {
    return true;
  }
  getData() {
    return this.exampleService.getData();
  }
}
