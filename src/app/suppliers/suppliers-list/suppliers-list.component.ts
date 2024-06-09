import { Component, OnInit } from '@angular/core';
import { Supplier } from '../supplier.dto';
import { Observable, lastValueFrom } from 'rxjs';
import { SupplierService } from '../supplier.service';
import { CommonModule } from '@angular/common';
import { LoadingBarComponent } from '../../loading-bar.component';
import { MaterialFlatModule } from '../../material-flat/material-flat.module';
import { RouterLink } from '@angular/router';
import { SupplierCardComponent } from './supplier-card/supplier-card.component';

@Component({
  selector: 'app-suppliers-list',
  standalone: true,
  imports: [
    CommonModule,
    LoadingBarComponent,
    MaterialFlatModule,
    RouterLink,
    SupplierCardComponent
  ],
  templateUrl: './suppliers-list.component.html',
  styles: ``
})
export class SuppliersListComponent implements OnInit {
  suppliers!: Supplier[];
  suppliersObservable!: Observable<Supplier[]>;

  constructor(
    private supplierService: SupplierService
  ){}

  async ngOnInit(){
    this.suppliersObservable = this.supplierService.getAll();
    this.suppliers = await lastValueFrom(this.suppliersObservable);
  }
}
