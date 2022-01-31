import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account/shared/account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  account = {
    name: '',
    email: '',
    password: ''
  }
  constructor(
    private router: Router,
    private accountService: AccountService
    ) { }

  ngOnInit(): void {
  }
  async onSubmit() {
    try{
      const result = await this.accountService.createAccount(this.account);
      if(result){
        this.accountService.showMessage('Conta criada com sucesso!')
        this.router.navigate([''])
      }
    } catch(error){
      console.error(error)
    }
  }
  back(){
    this.router.navigate(['/login'])
  }
}
