import { ExampleService } from './example.service';

describe('@ExampleService', () => {
  let exampleService: ExampleService;

  beforeEach(() => {
    exampleService = new ExampleService();
  });

  describe('when getData', () => {
    it('#should return a json when is consult', () => {

      expect(exampleService.getData().name).toEqual('ExampleService');
    });
  });
});
