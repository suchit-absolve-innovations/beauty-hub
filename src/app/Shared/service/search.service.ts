import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchCriteriaSubject = new BehaviorSubject<string>('');

  setSearchCriteria(criteria: string): void {
    this.searchCriteriaSubject.next(criteria);
  }

  getSearchCriteria(): string {
    return this.searchCriteriaSubject.value;
  }

  clearSearchCriteria(): void {
    this.searchCriteriaSubject.next('');
  }
}
