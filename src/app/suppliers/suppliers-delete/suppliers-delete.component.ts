import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../supplier.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Supplier } from '../supplier.dto';
import { Observable, lastValueFrom } from 'rxjs';
import { MaterialFlatModule } from '../../material-flat/material-flat.module';
import { CommonModule } from '@angular/common';
import { LoadingBarComponent } from '../../loading-bar.component';

@Component({
  selector: 'app-suppliers-delete',
  standalone: true,
  imports: [
    MaterialFlatModule,
    CommonModule,
    RouterLink,
    LoadingBarComponent
  ],
  templateUrl: './suppliers-delete.component.html',
  styles: ``
})
export class SuppliersDeleteComponent implements OnInit {
  supplier!: Supplier;
  supplierObservable!: Observable<Supplier>;
  id: number

  constructor(
    private supplierService: SupplierService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  async ngOnInit(): Promise<void> {
    this.id = +(this.route.snapshot.paramMap.get('id') || 0);
    this.supplierObservable = this.supplierService.getById(this.id);
    this.supplier = await lastValueFrom(this.supplierObservable);
  }

  async confirmDelete(){
    this.supplierObservable = this.supplierService.delete(this.id);
    await lastValueFrom(this.supplierObservable);
    this.router.navigate(['/suppliers']);
  }
}
