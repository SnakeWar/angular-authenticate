import { TodoService } from './../../services/todo.service';
import { Todo } from './../todo.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent implements OnInit {
  todo: Todo = {
    name: '',
    date: ''
  }
  constructor(
    private todoService: TodoService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  createTodo(): void {
    this.todoService
    .create(this.todo)
    .subscribe(() => {
      this.router.navigate(['/'])
      this.todoService.showMessage('Tarefa criada!')
    })
  }
  cancelar(): void {
    //this.todoService.showMessage('Cancelar...')
    this.router.navigate(['/'])
  }
}
