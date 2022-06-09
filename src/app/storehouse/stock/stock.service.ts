import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../products/Product';
import { ProductsService } from '../products/products.service';
import { Stock } from './Stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  urlGetStockByBarcode = 'http://localhost:8080/productshelf/all/barcode/';
  urlGetAllStock = 'http://localhost:8080/productshelf/all';
  urlGetStockByIdentifier = 'http://localhost:8080/productshelf/all/identifier/';
  urlGetStockByDate = 'http://localhost:8080/product/stock/';

  searchElement = new Subject<string>();
  searchElements = new Subject<string[]>();

  productList: Product[] = [];

  constructor(private http: HttpClient,
              private productsService: ProductsService) { }

  getStockByBarcode(barcode: string){
    return this.http.get<Stock[]>(this.urlGetStockByBarcode.concat(barcode));
  }

  getStockByIdentifier(identifier: string){
    return this.http.get<Stock[]>(this.urlGetStockByIdentifier.concat(identifier));
  }

  getAllStock(){
    return this.http.get<Stock[]>(this.urlGetAllStock);
  }

  getStockByDate(barcode: string, date: string){
    let urlString = this.urlGetStockByDate.concat(barcode + '/' + date);
    return this.http.get<Stock[]>(urlString);
  }

}
