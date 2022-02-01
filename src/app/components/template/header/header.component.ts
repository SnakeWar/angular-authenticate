import { Router } from '@angular/router';
import { AccountService } from './../../services/account/shared/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }
  async logout(){
    try {
      const result = await this.accountService.logout();
      //console.log('true')
      //console.log(`Login efetuado: ${result}`);
      if(result){
        this.accountService.showMessage('Até logo!');
        this.router.navigate([''])
      }
      
    }catch (error) {
      console.error(error);
    }
    
    
  }
}
