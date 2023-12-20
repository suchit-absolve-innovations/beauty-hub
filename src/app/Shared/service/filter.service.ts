import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filteredData: any[] = [];

  setFilteredData(data: any[]): void {
    this.filteredData = data;
  }

  getFilteredData(): any[] {
    return this.filteredData;
  }
}
