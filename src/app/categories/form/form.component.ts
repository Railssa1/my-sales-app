import { Category } from './../category.dto';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MaterialFlatModule } from '../../material-flat/material-flat.module';

@Component({
  selector: 'category-form',
  standalone: true,
  imports: [
    MaterialFlatModule
  ],
  templateUrl: './form.component.html',
  styles: ``
})
export class CategoryFormComponent {
  @Output() back = new EventEmitter<void>();
  @Output() save = new EventEmitter<Category>();

  constructor(
    private fb: FormBuilder
  ){}

  categoryForm = this.fb.group({
    id: [null],
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', Validators.required]
  });

  onSubmit(){
    console.log('Submit', this.categoryForm.value);
    this.save.emit(this.categoryForm.value as Category);
  }

  onBack(){
    this.back.emit();
  }

  @Input()
  set category(category: Category){
    this.categoryForm.setValue(category);
  }
}
