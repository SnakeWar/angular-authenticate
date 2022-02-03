import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from '../components/services/account/shared/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'Fechar', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const token = this.accountService.getAuthorizationToken();
    let request: HttpRequest<any> = req;

    if (
        token 
        && !this.accountService.isTokenExpired(token)
        ) {
      // O request é imutavel, ou seja, não é possível mudar nada
      // Faço o clone para conseguir mudar as propriedades
      // Passo o token de autenticação no header
      request = req.clone({ 
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }
    // retorno o request com o erro tratado
    return next.handle(request)
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Erro de client-side ou de rede
      console.error('Ocorreu um erro:', error.error.message);
    } else {
      // Erro retornando pelo backend
      if(error.status === 401){
        console.error('E-mail ou senha inválidos!');
        //alert('E-mail ou senha inválidos!');
        //this.snackBar.open('E-mail ou senha inválidos!', 'Fechar', { duration: 2000, panelClass: 'dangerSnack' });
      }
      else if(error.status === 422){
        console.error('Senha muito curta!');
        //alert('Senha muito curta!');
      }
      console.error(
        `Código do erro ${error.status}, ` +
        `Erro: ${JSON.stringify(error.error)}`);
    }
    // retornar um observable com uma mensagem amigavel.
    return throwError('Ocorreu um erro, tente novamente');
  }
}
