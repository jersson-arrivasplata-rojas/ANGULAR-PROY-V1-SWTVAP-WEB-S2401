import { ExampleService } from 'src/app/shared/services/example.service';
import { LoginComponent } from './login.component';

describe('@LoginComponent', () => {
  let component: LoginComponent;
  let exampleService: ExampleService;
  beforeEach(() => {
    exampleService = new ExampleService();
    component = new LoginComponent(exampleService);
  });

  describe('when login', () => {
    it('#should be return true when is connected', () => {

      expect(component.login()).toBeTruthy();
    });
  });
  describe('when getData', () => {
    it('#should be return data{} when call method', () => {

      expect(component.getData().name).toEqual('ExampleService');
    });
  });
});
