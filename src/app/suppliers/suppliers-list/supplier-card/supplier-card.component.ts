import { Component, Input } from '@angular/core';
import { MaterialFlatModule } from '../../../material-flat/material-flat.module';
import { Supplier } from '../../supplier.dto';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-supplier-card',
  standalone: true,
  imports: [
    MaterialFlatModule,
    RouterLink
  ],
  templateUrl: './supplier-card.component.html',
  styles: ``
})
export class SupplierCardComponent {
  @Input({required: true}) supplier: Supplier;
}
