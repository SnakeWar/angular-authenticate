import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = {
    name: '',
    price: null
  }

  constructor(
    private productService: ProductService,
    private router: Router
    ) { }

  ngOnInit(): void {
    
  }

  createProduct(): void {
    this.productService
    .create(this.product)
    .subscribe(() => {
      this.router.navigate(['/products'])
      this.productService.showMessage('Produto criado!')
    })
  }
  cancelar(): void {
    this.productService.showMessage('Cancelar...')
    this.router.navigate(['/products'])
  }

}
