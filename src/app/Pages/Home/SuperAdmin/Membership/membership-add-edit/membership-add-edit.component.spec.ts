import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipAddEditComponent } from './membership-add-edit.component';

describe('MembershipAddEditComponent', () => {
  let component: MembershipAddEditComponent;
  let fixture: ComponentFixture<MembershipAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
