import { RegisterComponent } from './register.component';

describe('@RegisterComponent', () => {
  let component: RegisterComponent;

  beforeEach(() => {
    component = new RegisterComponent();
  });

  describe('when component', () => {
    it('#should be return true', () => {

      expect(component).toBeTruthy();
    });
  });
});
