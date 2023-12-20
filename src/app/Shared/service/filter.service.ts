import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filterCriteriaSubject = new BehaviorSubject<any>(null);
  filterCriteria$ = this.filterCriteriaSubject.asObservable();

  setFilterCriteria(criteria: any) {
    this.filterCriteriaSubject.next(criteria);
  }
}
