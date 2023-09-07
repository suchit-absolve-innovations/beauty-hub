import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalonBannerComponent } from './edit-salon-banner.component';

describe('EditSalonBannerComponent', () => {
  let component: EditSalonBannerComponent;
  let fixture: ComponentFixture<EditSalonBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSalonBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSalonBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
