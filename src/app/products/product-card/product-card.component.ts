import { Product } from './../product.dto';
import { Component, Input } from '@angular/core';
import { MaterialFlatModule } from '../../material-flat/material-flat.module';
import { CommonModule } from '@angular/common';
import { CartService } from '../../cart.service';
import { CartItem } from '../../cart.dto';

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

  constructor(private cartService: CartService){}

  onAddToCart(item: Product){
    const cartItem: CartItem = {
      idProduct: item.id,
      unitPrice: item.unitPrice,
      quantity: 1,
      name: item.name
    }

    this.cartService.addItem(cartItem);
  }
}
