import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonBannerDetailComponent } from './salon-banner-detail.component';

describe('SalonBannerDetailComponent', () => {
  let component: SalonBannerDetailComponent;
  let fixture: ComponentFixture<SalonBannerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalonBannerDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalonBannerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
