import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminDetailComponent } from './add-admin-detail.component';

describe('AddAdminDetailComponent', () => {
  let component: AddAdminDetailComponent;
  let fixture: ComponentFixture<AddAdminDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
