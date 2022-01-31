import { TodoService } from './../../services/todo.service';
import { Todo } from './../todo.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//Decorator
@Component({
  selector: 'app-todo-read',
  templateUrl: './todo-read.component.html',
  styleUrls: ['./todo-read.component.css']
})
export class TodoReadComponent implements OnInit {
  //atributo Todo
  todos: Todo[]
  displayedColumns = ['id', 'name', 'date', 'actions']

  constructor(
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.todoService.read().subscribe(todos => {
      this.todos = todos['data']
      console.log(todos['data'])
    })
  }
}
