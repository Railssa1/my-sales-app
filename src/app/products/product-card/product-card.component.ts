import { Product } from './../product.dto';
import { Component, Input } from '@angular/core';
import { MaterialFlatModule } from '../../material-flat/material-flat.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    MaterialFlatModule,
    CommonModule
  ],
  templateUrl: './product-card.component.html',
  styles: ``
})
export class ProductCardComponent {
  @Input() product: Product;

  onAddToCart(product: Product){
    console.log("TODO");
  }
}
