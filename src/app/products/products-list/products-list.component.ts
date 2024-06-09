import { CartItem } from './../../cart.dto';
import { Product } from './../product.dto';
import { Component, OnInit } from '@angular/core';
import { MaterialFlatModule } from '../../material-flat/material-flat.module';
import { CommonModule } from '@angular/common';
import { LoadingBarComponent } from '../../loading-bar.component';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, lastValueFrom } from 'rxjs';
import { CartService } from '../../cart.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    MaterialFlatModule,
    CommonModule,
    LoadingBarComponent,
    ProductCardComponent
  ],
  templateUrl: './products-list.component.html',
  styles: ``
})
export class ProductsListComponent implements OnInit {
  products: Product[];
  productsObservable: Observable<Product[]>;
  searchForm: FormGroup;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private cartService: CartService
  ){}

  async ngOnInit(){
    this.searchForm = this.fb.group({
      searchTerm: ['']
    })
    this.getProducts();
  }

  private async getProducts(searchTerm?: string){
    this.productsObservable = this.productService.getAll(searchTerm);
    this.products = await lastValueFrom(this.productsObservable);
  }

  onSearch(){
    this.getProducts(this.searchForm.value.searchTerm);
  }
}
