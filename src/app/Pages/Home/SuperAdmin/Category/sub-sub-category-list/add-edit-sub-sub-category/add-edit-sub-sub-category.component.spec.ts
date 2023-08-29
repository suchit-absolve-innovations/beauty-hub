import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSubSubCategoryComponent } from './add-edit-sub-sub-category.component';

describe('AddEditSubSubCategoryComponent', () => {
  let component: AddEditSubSubCategoryComponent;
  let fixture: ComponentFixture<AddEditSubSubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSubSubCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSubSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
