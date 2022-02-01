import { Todo } from './../todo/todo.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  baseUrl = environment.api

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
    return this.http.post<Todo>(this.baseUrl, todo, {
      headers: new HttpHeaders(
        {
          'Access-Control-Allow-Origin': '*',
        })
      })
  }

  read(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl, {
      headers: new HttpHeaders(
        {
          'Access-Control-Allow-Origin': '*',
        })
      })
  }

  readById(id: number): Observable<Todo> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Todo>(url, {
      headers: new HttpHeaders(
        {
          'Access-Control-Allow-Origin': '*',
        })
      })
  }

  update(todo: Todo): Observable<Todo>{
    const url = `${this.baseUrl}/${todo.id}`;
    return this.http.put<Todo>(url, todo, {
      headers: new HttpHeaders(
        {
          'Access-Control-Allow-Origin': '*',
        })
      });
  }

  delete(id: number): Observable<Todo> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Todo>(url, {
      headers: new HttpHeaders(
        {
          'Access-Control-Allow-Origin': '*',
        })
      });
  }
}
