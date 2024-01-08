import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpComingScheduleDetailComponent } from './up-coming-schedule-detail.component';

describe('UpComingScheduleDetailComponent', () => {
  let component: UpComingScheduleDetailComponent;
  let fixture: ComponentFixture<UpComingScheduleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpComingScheduleDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpComingScheduleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
