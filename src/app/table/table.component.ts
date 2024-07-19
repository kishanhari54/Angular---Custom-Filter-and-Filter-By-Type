import { Component, OnInit } from '@angular/core';

// table.component.ts
import { Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

interface Options {
  filter: {
    included: boolean;
    customfilter?: (data: any, filter: string) => boolean;
  };
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
})
export class TableComponent {
  @Input() dataSource: MatTableDataSource<any>; // Replace `any` with your data type
  @Input() options: Options; // Adjust type as per your Options interface

  //this.dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'age','text']; // Adjust columns as per your data structure
  filterValue: string = '';
  selectedColumn: string = '';
  selectedValue: any;

  constructor() {}

  ngOnInit(): void {
    // Initialize filter predicate based on options
   /* if (this.options && this.options.filter.included) {
      if (this.options.filter.customfilter) {
        this.dataSource.filterPredicate = this.options.filter.customfilter;
      } else {
        // Default filter predicate
        const defaultPredicate = this.dataSource.filterPredicate;
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const dataStr = JSON.stringify(data).toLowerCase();
          return dataStr.indexOf(filter.toLowerCase()) !== -1;
        };
      }
    }*/
  }

  applyFilter() {
    let filterValue = this.filterValue.trim().toLowerCase();
    let combinedFilter = filterValue;

    // Apply input field filter
    if (this.selectedColumn && this.selectedValue !== undefined) {
      combinedFilter = combinedFilter + `-${this.selectedColumn}:${this.selectedValue}`;
    }

    // Apply combined filter
    if (this.options.filter.customfilter) {
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        if (!filter) return true; // No filter applied

        // Split combined filter to get individual parts
        const parts = filter.split('-');
        const textFilter = parts[0].trim();

        // Apply parent's custom filter predicate
        if (!this.options.filter.customfilter(data, textFilter)) {
          return false;
        }

        // Apply dropdown filter
        if (parts.length > 1) {
          const columnFilter = parts[1].trim();
          const [column, value] = columnFilter.split(':').map(item => item.trim());
          if (data[column] !== value) {
            return false;
          }
        }

        return true;
      };
    } else {
      // No parent filter predicate, use default combined filter logic
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        if (!filter) return true; // No filter applied

        // Split combined filter to get individual parts
        const parts = filter.split('-');
        const textFilter = parts[0].trim();

        // Apply input field filter
        if (textFilter && JSON.stringify(data).toLowerCase().indexOf(textFilter) === -1) {
          return false;
        }

        // Apply dropdown filter
        if (parts.length > 1) {
          const columnFilter = parts[1].trim();
          const [column, value] = columnFilter.split(':').map(item => item.trim());
          if (data[column] !== value) {
            return false;
          }
        }

        return true;
      };
    }

    // Apply filter
    this.dataSource.filter = combinedFilter;
  }
 /* applyFilter() {
    let filterValue = this.filterValue.trim().toLowerCase();
    let combinedFilter = filterValue;

    // Apply input field filter
    if (this.selectedColumn && this.selectedValue !== undefined) {
      combinedFilter =
        combinedFilter + `-${this.selectedColumn}:${this.selectedValue}`;
    }

    // Set filter predicate
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      if (!filter) return true; // No filter applied

      // Split combined filter to get individual parts
      const parts = filter.split('-');
      const textFilter = parts[0].trim();

      // Apply input field filter
      if (
        textFilter &&
        JSON.stringify(data).toLowerCase().indexOf(textFilter) === -1
      ) {
        return false;
      }

      // Apply dropdown filter
      if (parts.length > 1) {
        const columnFilter = parts[1].trim();
        const [column, value] = columnFilter
          .split(':')
          .map((item) => item.trim());
        if (data[column] !== value) {
          return false;
        }
      }

      return true;
    };

    // Apply combined filter
    this.dataSource.filter = combinedFilter;
  }*/

  onColumnSelected(column: any) {
    debugger;
    this.selectedColumn = column.value;
    // Fetch unique values for the selected column
    this.selectedValue = undefined; // Reset selected value
    // You can fetch unique values based on the selected column and populate `this.uniqueValues`
    // Example:
    // this.uniqueValues = this.getUniqueColumnValues(column);
  }

  onValueSelected(value: any) {
    debugger;
    this.selectedValue = value.value;
    this.applyFilter();
  }
}
