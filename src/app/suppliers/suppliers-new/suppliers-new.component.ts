import { Supplier } from './../supplier.dto';
import { Component, OnInit } from '@angular/core';
import { MaterialFlatModule } from '../../material-flat/material-flat.module';
import { CommonModule } from '@angular/common';
import { LoadingBarComponent } from '../../loading-bar.component';
import { Observable, lastValueFrom, of } from 'rxjs';
import { Router } from '@angular/router';
import { SupplierService } from '../supplier.service';
import { SuppliersFormComponent } from '../suppliers-form/suppliers-form.component';

@Component({
  selector: 'app-suppliers-new',
  standalone: true,
  imports: [
    MaterialFlatModule,
    CommonModule,
    LoadingBarComponent,
    SuppliersFormComponent
  ],
  templateUrl: './suppliers-new.component.html',
  styles: ``
})
export class SuppliersNewComponent implements OnInit{
  supplier: Supplier;
  supplierObservable: Observable<Supplier>;

  constructor(
    private router: Router,
    private supplierService: SupplierService
  ){}

  async ngOnInit(): Promise<void> {
    this.supplierObservable = await of(this.supplierService.create());
    this.supplier = await lastValueFrom(this.supplierObservable);

  }

  async onSave(supplier: Supplier): Promise<void> {
    this.supplierObservable = this.supplierService.save(supplier);
    const result = await lastValueFrom(this.supplierObservable);
    this.router.navigate(['/suppliers/show', result.id]);

  }

  onBack(){
    this.router.navigate(['/suppliers']);
  }

}
