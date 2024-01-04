// spinner.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  spinner$: any;
  hide() {
    throw new Error('Method not implemented.');
  }
  show() {
    throw new Error('Method not implemented.');
  }
  private categorySpinnerSubject = new BehaviorSubject<boolean>(false);
  categorySpinner$ = this.categorySpinnerSubject.asObservable();

  showCategorySpinner() {
    this.categorySpinnerSubject.next(true);
  }

  hideCategorySpinner() {
    this.categorySpinnerSubject.next(false);
  }
}
