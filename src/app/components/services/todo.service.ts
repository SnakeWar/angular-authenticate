import { Todo } from './../todo/todo.model';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  baseUrl = "http://localhost/jwt-laravel-8/public/api/auth/todos"

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'Fechar', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  create(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.baseUrl, todo).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  read(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e:any): Observable<any> {
    this.showMessage('Ocorreu um erro', true);
    return EMPTY;
  }
   readById(id: number): Observable<Todo> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Todo>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(todo: Todo): Observable<Todo>{
    const url = `${this.baseUrl}/${todo.id}`;
    return this.http.put<Todo>(url, todo).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<Todo> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Todo>(url);
  }
}
