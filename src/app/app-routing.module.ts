import { AuthGuard } from './components/account/shared/auth.guard';
import { CreateAccountComponent } from './components/account/create-account/create-account.component';
import { LoginComponent } from './components/account/login/login.component';
import { AuthenticationComponent } from './components/template/authentication/authentication.component';
import { TodoDeleteComponent } from './components/todo/todo-delete/todo-delete.component';
import { TodoReadComponent } from './components/todo/todo-read/todo-read.component';
import { TodoUpdateComponent } from './components/todo/todo-update/todo-update.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ProductCrudComponent } from './views/product-crud/product-crud.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { TodoCrudComponent } from './views/todo-crud/todo-crud.component';
import { TodoCreateComponent } from './components/todo/todo-create/todo-create.component';



const routes: Routes = [{
  path: "",
  component : HomeComponent,
  children: [
    {
      path: "",
      component: TodoCrudComponent
    },{
      path: "create",
      component: TodoCreateComponent
    },{
      path: "edit/:id",
      component: TodoUpdateComponent
    },{
      path: "delete/:id",
      component: TodoDeleteComponent
    }
  ],
  canActivate: [AuthGuard]
},{
  path: '',
  component: AuthenticationComponent,
  children: [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'create-account', component: CreateAccountComponent},
  ]
}
,{
  path: "products",
  component: ProductCrudComponent
},{
  path: "products/create",
  component: ProductCreateComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
