import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAddNotificationComponent } from './super-add-notification.component';

describe('SuperAddNotificationComponent', () => {
  let component: SuperAddNotificationComponent;
  let fixture: ComponentFixture<SuperAddNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperAddNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAddNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
