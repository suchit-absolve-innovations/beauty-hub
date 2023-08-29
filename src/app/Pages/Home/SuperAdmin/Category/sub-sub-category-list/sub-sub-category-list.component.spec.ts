import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSubCategoryListComponent } from './sub-sub-category-list.component';

describe('SubSubCategoryListComponent', () => {
  let component: SubSubCategoryListComponent;
  let fixture: ComponentFixture<SubSubCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubSubCategoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubSubCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
