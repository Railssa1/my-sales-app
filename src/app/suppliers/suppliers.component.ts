import { Component } from '@angular/core';
import { MaterialFlatModule } from '../material-flat/material-flat.module';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [
    MaterialFlatModule,
    RouterOutlet
  ],
  templateUrl: './suppliers.component.html',
  styles: ``
})
export class SuppliersComponent {

}
