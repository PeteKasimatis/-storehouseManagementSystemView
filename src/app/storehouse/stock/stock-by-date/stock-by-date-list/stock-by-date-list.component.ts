import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/storehouse/products/products.service';
import { Stock } from '../../Stock';
import { StockService } from '../../stock.service';

@Component({
  selector: 'app-stock-by-date-list',
  templateUrl: './stock-by-date-list.component.html',
  styleUrls: ['./stock-by-date-list.component.css'],
})
export class StockByDateListComponent implements OnInit {
  isFetching = false;
  error = false;
  errorMessage = null;
  product: string;
  date: string;
  sub: Subscription;
  stock: Stock[];

  constructor(
    private stockService: StockService,
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit() {
    this.subscribeOnSubject();
    this.getStock(this.route.snapshot.paramMap.get('barcode'), this.route.snapshot.paramMap.get('date'));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  subscribeOnSubject() {
    this.sub = this.stockService.searchElements.subscribe((data) => {
      this.error = false;
      this.getStock(data[0], data[1]);
    });
  }

  getStock(barcode: string, date: string) {
    this.isFetching = true;
    this.date = date;
    this.stockService.getStockByDate(barcode, date).subscribe(
      (stock) => {
        this.stock = stock;
        this.isFetching = false;
      },
      (error) => {
        this.error = true;
        this.isFetching = false;
        if (error.status == 0){
          this.errorMessage = error.message;
        }
        else
          this.errorMessage = error.error.message;
      }
    );

    this.productService.getProduct(barcode).subscribe((product) => {
      this.product = product.description;
    });
  }
}
