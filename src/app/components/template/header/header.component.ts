import { Router } from '@angular/router';
import { AccountService } from './../../services/account/shared/account.service';
import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private router: Router,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
  }

  async logout() {
    try {
      const result = await this.accountService.logout();
      //console.log('true')
      //console.log(`Login efetuado: ${result}`);
      if(result){
        this.accountService.showMessage('Até logo!')
        this.router.navigate(['login']);
      }
      
    }catch (error) {
      console.error(error);
    }
  }

  get title():string{
    return this.headerService.HeaderData.title;
  }
  get icon():string{
    return this.headerService.HeaderData.icon;
  }
  get routeUrl():string{
    return this.headerService.HeaderData.routeUrl;
  }
  // set title():string{
  //   return this.headerService.HeaderData.title;
  // }
}
