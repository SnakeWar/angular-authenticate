import { Todo } from './../todo/todo.model';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  baseUrl = "http://localhost/jwt-laravel-8/public/api/auth/todos"

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'Fechar', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.baseUrl, todo)
  }

  read(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl)
  }

  readById(id: number): Observable<Todo> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Todo>(url)
  }

  update(todo: Todo): Observable<Todo>{
    const url = `${this.baseUrl}/${todo.id}`;
    return this.http.put<Todo>(url, todo);
  }

  delete(id: number): Observable<Todo> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Todo>(url);
  }
}
