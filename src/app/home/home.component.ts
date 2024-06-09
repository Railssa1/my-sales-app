import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MenuComponent } from '../menu/menu.component';
import { CategoriesComponent } from '../categories/categories.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CartService } from '../cart.service';
import { MaterialFlatModule } from '../material-flat/material-flat.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [
    MaterialFlatModule,
    AsyncPipe,
    MenuComponent,
    CategoriesComponent,
    RouterOutlet,
    CommonModule,
    RouterLink
  ]
})
export class HomeComponent {
  private breakpointObserver = inject(BreakpointObserver);
  public cartService = inject(CartService);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
