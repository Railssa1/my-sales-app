import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CategoriesItem } from './categories-datasource';
import { Category } from './category.dto';
import { CategoryService } from './category.service';
import { lastValueFrom } from 'rxjs';
import { CategoryFormComponent } from './form/form.component';
import { LoadingBarComponent } from '../loading-bar.component';
import { MaterialFlatModule } from '../material-flat/material-flat.module';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: `
    .full-width-table {
      width: 100%;
    }

  `,
  standalone: true,
  imports: [
    MaterialFlatModule,
    CategoryFormComponent,
    LoadingBarComponent
  ]
})
export class CategoriesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CategoriesItem>;
  dataSource = new MatTableDataSource<Category>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'description', 'actions'];
  showForm: boolean = false;
  category!: Category;
  showLoading: boolean = false;

  constructor(
    private categoryService: CategoryService
  ){}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.loadCategories();
  }

  async loadCategories(): Promise<void>{
    this.showLoading = true;
    const categories = await lastValueFrom(this.categoryService.getAll());
    this.dataSource = new MatTableDataSource(categories);
    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.showLoading = false;
  }

  onNewCategoryClick(){
    this.category = {
      id: 0,
      name: '',
      description: ''
    };

    this.showForm = true;
  }

  hideCategoryForm(){
    this.showForm = false;
    this.loadCategories();
  }

  onEditCategoryClick(category: Category) {
    this.showForm = true;
    this.category = category;
  }

  async onSave(category: Category){
    await lastValueFrom(this.categoryService.save(category));
    console.log("Saved", category);
    this.hideCategoryForm();
  }

  async onDeleteCategoryClick(category: Category){
    if(confirm(`Deletar ${category.name} com id ${category.id}?`)){
      this.showLoading = true;
      await lastValueFrom(this.categoryService.delete(category.id))
      this.loadCategories();
      this.showLoading = false;
    }
  }
}
