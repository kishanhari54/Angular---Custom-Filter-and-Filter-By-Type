import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

interface Options {
  filter: {
    included: boolean;
    customfilter?: (data: any, filter: string) => boolean;
  };
}
@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent implements OnInit {
  dataSource = new MatTableDataSource<any>(); // Replace `any` with your data type
  options: Options = {
    filter: {
      included: true,
      customfilter: (data: any, filter: string) => {
        // Example custom filter logic
        return (
          data.name.toLowerCase().includes(filter.toLowerCase()) ||
          data.text.toString().toLowerCase().includes(filter.toLowerCase())
        );
      },
    },
  };
  constructor() {}

  ngOnInit() {
    // Initialize your dataSource with data
    this.dataSource = new MatTableDataSource([
      { name: 'John', age: 25, text: 'Dummy' },
      { name: 'Jane', age: 30, text: 'Dummy2' },
      { name: 'Jolly', age: 30, text: 'Dummy' },
      { name: 'Doe', age: 35, text: 'Dummy' },
      { name: 'Doe', age: 40, text: 'Dummy' },
      { name: 'Doe', age: 50, text: 'Dummy' },
      { name: 'Doe', age: 35, text: 'Dummy' },
    ]);
  }
}
