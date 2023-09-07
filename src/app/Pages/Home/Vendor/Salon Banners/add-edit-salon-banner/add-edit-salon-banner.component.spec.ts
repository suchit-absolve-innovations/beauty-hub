import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSalonBannerComponent } from './add-edit-salon-banner.component';

describe('AddEditSalonBannerComponent', () => {
  let component: AddEditSalonBannerComponent;
  let fixture: ComponentFixture<AddEditSalonBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSalonBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSalonBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
