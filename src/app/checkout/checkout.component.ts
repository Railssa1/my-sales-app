import { CartService } from './../cart.service';
import { Component, OnInit, inject } from '@angular/core';
import { MaterialFlatModule } from '../material-flat/material-flat.module';
import { CurrencyPipe } from '@angular/common';
import { CartItem } from '../cart.dto';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    MaterialFlatModule,
    CurrencyPipe
  ],
  templateUrl: './checkout.component.html',
  styles: ``
})
export class CheckoutComponent implements OnInit {
  cartService = inject(CartService);
  public items: CartItem[] = [];

  ngOnInit(): void {
    this.items = this.cartService.getItems();
  }

  onRemoveItem(item: CartItem){
    this.cartService.removeItem(item);
    this.items = this.cartService.getItems();
  }
}
