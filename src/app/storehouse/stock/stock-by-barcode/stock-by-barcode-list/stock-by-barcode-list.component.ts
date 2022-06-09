import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
import { ProductsService } from 'src/app/storehouse/products/products.service';
import { Stock } from '../../Stock';
import { StockService } from '../../stock.service';

@Component({
  selector: 'app-stock-by-barcode-list',
  templateUrl: './stock-by-barcode-list.component.html',
  styleUrls: ['./stock-by-barcode-list.component.css']
})
export class StockByBarcodeListComponent implements OnInit, OnDestroy{

  isFetching = false;
  error = false;
  errorMessage = null;
  stock: Stock[];
  product: string;
  sub: Subscription;

  constructor(private stockService: StockService,
              private route: ActivatedRoute,
              private productService: ProductsService) {}


  ngOnInit() {
    this.subscribeOnSubject();
    this.getStock();
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  subscribeOnSubject(){
    this.sub = this.stockService.searchElement.subscribe(data => {
      this.error = false;
      this.getStock(data)})
  }

  getStock(data?: string){
    let barcode: string;
    this.isFetching = true;
    if(data){
      barcode = data;
    }
    else
      barcode = this.route.snapshot.paramMap.get('barcode')
    this.stockService
      .getStockByBarcode(barcode)
      .subscribe(
        stock =>{
          this.stock = stock;
          this.isFetching = false;
        },
        error =>{
          this.error = true;
          this.isFetching = false;
          if (error.status == 0){
            this.errorMessage = error.message;
          }
          else
            this.errorMessage = error.error.message;
        }
      );
    this.productService.getProduct(barcode).subscribe(product =>{
      this.product = product.description;
    })
  }


}
