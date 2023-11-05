import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryPagination } from 'src/app/interfaces/brands.interface';
import { Category } from 'src/app/interfaces/sales.interface';
import { Subscription } from 'rxjs'; 
import { CategoriesService } from 'src/app/services/products/categories.service';
import { faFolderOpen, faFolder, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {

  @Output() saved: EventEmitter<any> = new EventEmitter();

  subs_categories: Subscription | undefined = undefined;

  faFolderPencil = faPencilAlt;
  faTrash = faTrash;

  categories: Category[] = [];

  category_pagination: CategoryPagination | undefined = undefined;

  name:string = '';
  description:string = '';
  id_edit: any = '';
  constructor(
    private category_service: CategoriesService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnDestroy(): void {
    this.subs_categories?.unsubscribe();
  }

  onSubmit(){
    if (this.name){
      if (this.description == ''){ this.description = this.name }
      let form = new FormData();
      form.append('name', this.name)
      form.append('description', this.name)

      this.category_service.set_category(form).subscribe(data => {
        this._snackBar.open('Categoria agregado con exito', 'cerrar')
        this.saved.emit(null);
        this.cleanForm();
        this.loadData();
      })

      
    }
  }

  cleanForm(){
    this.name = '';
    this.description = '';
    this.id_edit = '';
  }

  loadData(){
    this.subs_categories = this.category_service.get_categories().subscribe(data => {
      this.category_pagination = data;
      this.categories = this.category_pagination.results;
    })
  }

  ngOnInit(): void {
    this.loadData()
  }

  delete(item: any){
    this.category_service.delete_category(item.id).subscribe(
      data => {
        this.loadData();
        this.saved.emit(null);
        this._snackBar.open('El registro fue eliminado', 'cerrar')
      }
    )
  }

  edit(item: any){
    this.id_edit = item.id;
    this.name = item.name;
    this.description = item.description;
  }

}
