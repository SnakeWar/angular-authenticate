import { environment } from './../../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'Fechar', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }
  login(user: any){
    const url = `${environment.api}/auth/signin`;
    return this.http.post<any>(url, user)
  }
  // async login(user: any) {
  //   const result = await this.http.post<any>(`${environment.api}/auth/signin`, user).toPromise();
  //   if(result && result.access_token){
  //     window.localStorage.setItem('token', result.access_token);
  //     return true;
  //   }
  // }
  createAccount(account: any) {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}
