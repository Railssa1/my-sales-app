import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.dto';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(search: string = ""): Observable<Product[]>{
    const searchTerm = search != "" ? "&q=" + search : "";
    const baseUrl = `${environment.api}products?_expand=category&_expand=supplier${searchTerm}`;
    return this.http.get<Product[]>(baseUrl);
  }
}
