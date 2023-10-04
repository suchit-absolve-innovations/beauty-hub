import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedServiceListComponent } from './booked-service-list.component';

describe('BookedServiceListComponent', () => {
  let component: BookedServiceListComponent;
  let fixture: ComponentFixture<BookedServiceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookedServiceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
