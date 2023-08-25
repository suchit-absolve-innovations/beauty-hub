import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyMebershipPlanListComponent } from './buy-mebership-plan-list.component';

describe('BuyMebershipPlanListComponent', () => {
  let component: BuyMebershipPlanListComponent;
  let fixture: ComponentFixture<BuyMebershipPlanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyMebershipPlanListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyMebershipPlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
