import { AccountService } from './../../services/account/shared/account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login = {
    email: '',
    password: ''
  }
  constructor(
    private accountService: AccountService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  async onSubmit() {
    try {
      const result = await this.accountService.login(this.login);
      if(result && result.access_token){
        window.localStorage.setItem('token', result.access_token);
        console.log('true')
        console.log(window.localStorage.getItem('token'));
        this.accountService.showMessage('Login efetuado!')
        this.router.navigate(['']);
      }
      console.log('falso')
      return false;
      console.log(`Login efetuado: ${result}`);
      this.accountService.showMessage('Login efetuado!')
      this.router.navigate(['']);
    }catch (error) {
      console.error(error);
    }
  }
  createAccount(){
    this.router.navigate(['/create-account'])
  }
}
