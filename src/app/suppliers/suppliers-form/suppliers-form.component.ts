import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaterialFlatModule } from '../../material-flat/material-flat.module';
import { Supplier } from '../supplier.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-suppliers-form',
  standalone: true,
  imports: [
    MaterialFlatModule
  ],
  templateUrl: './suppliers-form.component.html',
  styles: ``
})
export class SuppliersFormComponent implements OnInit{
  @Input({required: true}) supplier: Supplier;
  @Output() save = new EventEmitter<Supplier>();
  @Output() back = new EventEmitter;
  supplierForm: FormGroup;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.supplierForm = this.formBuilder.group({
      id: [this.supplier.id],
      companyName: [
        this.supplier.companyName,
        [Validators.required, Validators.minLength(3)]
      ],
      contactName: [
        this.supplier.contactName,
        [Validators.required, Validators.minLength(3)]
      ],
      contactTitle: [
        this.supplier.contactName,
        [Validators.required, Validators.minLength(3)]
      ],
      address: this.formBuilder.group({
        city: [this.supplier.address.city],
        country: [this.supplier.address.country],
        phone: [this.supplier.address.phone],
        postalCode: [this.supplier.address.postalCode],
        region: [this.supplier.address.region],
        street: [this.supplier.address.street]
      })
    });
  }

  onSubmit(){
    this.save.emit(this.supplierForm.value as Supplier);
  }

  onBack(event: any){
    event.preventDefault();
    this.back.emit();
  }
}
