import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

private urlProductCreate = 'http://localhost:8080/product/create';
private urlProductGetAll = 'http://localhost:8080/product/all';
private urlProductGetByBarcode = 'http://localhost:8080/product/find/';
private urlProductGet = 'http://localhost:8080/product/get/';
private urlProductUpdate = 'http://localhost:8080/product/update';
private urlProductDelete = 'http://localhost:8080/product/delete/';

constructor(private http: HttpClient) { }

postProduct(product: Product){
  return this.http.post<Product>(this.urlProductCreate, product);
}

putProduct(product: Product){
  return this.http.put<Product>(this.urlProductUpdate, product);
}

getProductByBarcode(barcode: string): Observable<Product>{
  return this.http.get<Product>(this.urlProductGetByBarcode.concat(barcode));
}

getProduct(id: string): Observable<Product>{
  return this.http.get<Product>(this.urlProductGet.concat(id));
}

getProducts(): Observable<Product[]>{
  return this.http.get<Product[]>(this.urlProductGetAll);
}

deleteProduct(id: string){
  return this.http.delete(this.urlProductDelete.concat(id));
}

}
