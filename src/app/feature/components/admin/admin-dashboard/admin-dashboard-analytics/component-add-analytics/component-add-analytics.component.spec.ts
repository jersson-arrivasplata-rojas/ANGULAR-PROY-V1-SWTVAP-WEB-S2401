import { FormBuilder } from '@angular/forms';
import { ComponentAddAnalyticsComponent } from './component-add-analytics.component';

describe('@ComponentAddAnalyticsComponent', () => {
  let component: ComponentAddAnalyticsComponent;

  beforeEach(() => {
    component = new ComponentAddAnalyticsComponent(new FormBuilder());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit added event when form is valid and add is called', () => {
    spyOn(component.added, 'emit');
    component.itemForm.setValue({ visitedPage: 'testPage', visitedDate: '2022-01-01' });
    component.add();
    expect(component.added.emit).toHaveBeenCalled();
  });

  it('should not emit added event when form is invalid and add is called', () => {
    spyOn(component.added, 'emit');
    component.itemForm.setValue({ visitedPage: '', visitedDate: '' });
    component.add();
    expect(component.added.emit).not.toHaveBeenCalled();
  });
});
