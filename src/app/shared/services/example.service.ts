import { Injectable } from '@angular/core';

@Injectable()
export class ExampleService {


  constructor() {}

  getData() {

    return {
      name: 'ExampleService',
      detail: 'Example of Service'
    };
  }
}
