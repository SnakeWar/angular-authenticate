import { environment } from './../../../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'Fechar', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }
  async login(user: any) {
    const result = await this.http.post<any>(`${environment.api}/auth/signin`, user)
    .toPromise();
    if(result && result.access_token){
      //console.log('login')
      window.localStorage.setItem('token', result.access_token);
      return true;
    }
    return false;
  }
  async createAccount(account: any) {
    const result = await this.http.post<any>(`${environment.api}/auth/signup`, account)
    .toPromise();
    if(result){
      return result;
    }
    return false;
  }

  async logout() {
    const token = window.localStorage.getItem('token');
    const result = await this.http.post<any>(`${environment.api}/auth/signout`, {
      headers:
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'MyClientCert': '',        // This is empty
            'Authorization': `Bearer ${token}` // This is empty
          }
        )
    })
    .toPromise();
    if(result){
      window.localStorage.clear();
      return result;
    }
    return false;
  }

  getAuthorizationToken(){
    const token = window.localStorage.getItem('token');
    return token;
  }

  getTokenExpirationDate(token: string): Date {
    const decoded: any = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }
  isUserLoggedIn() {
    const token = this.getAuthorizationToken();
    if (!token) {
      return false;
    } else if (this.isTokenExpired(token)) {
      return false;
    }

    return true;
  }
}
