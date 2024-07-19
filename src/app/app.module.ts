import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { TableComponent } from './table/table.component';
import { ParentComponent } from './parent/parent.component';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    CommonModule,
    MatSelectModule,
  ],
  declarations: [AppComponent, HelloComponent, ParentComponent, TableComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
