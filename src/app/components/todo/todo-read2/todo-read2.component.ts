import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TodoRead2DataSource, TodoRead2Item } from './todo-read2-datasource';

@Component({
  selector: 'app-todo-read2',
  templateUrl: './todo-read2.component.html',
  styleUrls: ['./todo-read2.component.css']
})
export class TodoRead2Component implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TodoRead2Item>;
  dataSource: TodoRead2DataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'date'];

  constructor() {
    this.dataSource = new TodoRead2DataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
