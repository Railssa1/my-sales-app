import { Component } from '@angular/core';
import { MaterialFlatModule } from '../material-flat/material-flat.module';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MaterialFlatModule,
    RouterOutlet
  ],
  templateUrl: './products.component.html',
  styles: ``
})
export class ProductsComponent {

}
