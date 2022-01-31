import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit() {

  }
  back(){
    this.router.navigate(['/login'])
  }
}
