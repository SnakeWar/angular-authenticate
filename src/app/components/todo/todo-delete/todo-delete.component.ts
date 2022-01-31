import { Todo } from './../todo.model';
import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-delete',
  templateUrl: './todo-delete.component.html',
  styleUrls: ['./todo-delete.component.css']
})
export class TodoDeleteComponent implements OnInit {

  todo: Todo = {
    name: '',
    date: ''
  }

  constructor(
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.todoService.readById(+id)
    .subscribe(todo => {
      this.todo = todo
    });
  }
  deleteTodo(): void {
    this.todoService
    .delete(this.todo.id)
    .subscribe(() => {
      this.todoService.showMessage('Tarefa excluída!')
      this.router.navigate(['/']);
      
    })
  }
  cancelar(){
    this.router.navigate(['/']);
  }
}
