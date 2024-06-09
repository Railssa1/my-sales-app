import { SupplierService } from './../supplier.service';
import { Component, OnInit } from '@angular/core';
import { MaterialFlatModule } from '../../material-flat/material-flat.module';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Supplier } from '../supplier.dto';
import { Observable, lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoadingBarComponent } from '../../loading-bar.component';

@Component({
  selector: 'app-suppliers-show',
  standalone: true,
  imports: [
    CommonModule,
    MaterialFlatModule,
    RouterLink,
    LoadingBarComponent
  ],
  templateUrl: './suppliers-show.component.html',
  styles: ``
})
export class SuppliersShowComponent implements OnInit{
  supplier: Supplier;
  supplierObservable: Observable<Supplier>;

  constructor(
    private route: ActivatedRoute,
    private supplierService: SupplierService
  ){}

  async ngOnInit(): Promise<void> {
      const id: number = +(this.route.snapshot.paramMap.get('id') || 0);
      this.supplierObservable = this.supplierService.getById(id);
      this.supplier = await lastValueFrom(this.supplierObservable);
      console.log(this.supplier);
  }
}
