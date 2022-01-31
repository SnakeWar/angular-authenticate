import { Todo } from './../todo.model';
import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-update',
  templateUrl: './todo-update.component.html',
  styleUrls: ['./todo-update.component.css']
})
export class TodoUpdateComponent implements OnInit {

  todo: Todo;

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
  updateTodo(): void {
    this.todoService
    .update(this.todo)
    .subscribe(() => {
      this.router.navigate(['/'])
      this.todoService.showMessage('Tarefa atualizada!')
    })
  }
  cancelar(): void {
    //this.todoService.showMessage('Cancelar...')
    this.router.navigate(['/'])
  }

}
