import { Supplier } from './../supplier.dto';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { SupplierService } from '../supplier.service';
import { MaterialFlatModule } from '../../material-flat/material-flat.module';
import { CommonModule } from '@angular/common';
import { LoadingBarComponent } from '../../loading-bar.component';
import { SuppliersFormComponent } from '../suppliers-form/suppliers-form.component';

@Component({
  selector: 'app-suppliers-edit',
  standalone: true,
  imports: [
    MaterialFlatModule,
    CommonModule,
    LoadingBarComponent,
    SuppliersFormComponent
  ],
  templateUrl: './suppliers-edit.component.html',
  styles: ``
})
export class SuppliersEditComponent {
  supplier: Supplier;
  supplierObservable: Observable<Supplier>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private supplierService: SupplierService,
    private router: Router
  ){}

  async ngOnInit(): Promise<void> {
    const id: number = +(this.activatedRoute.snapshot.paramMap.get('id') || 0);
    this.supplierObservable = this.supplierService.getById(id);
    this.supplier = await lastValueFrom(this.supplierObservable);
  }

  onBack(){
    this.router.navigate(['/suppliers']);
  }

  async onSave(supplier: Supplier){
    this.supplierObservable = this.supplierService.save(supplier);
    this.supplier = await lastValueFrom(this.supplierObservable);
    this.router.navigate(['/suppliers/show', supplier?.id]);
  }
}
