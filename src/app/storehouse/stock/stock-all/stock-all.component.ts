import { Component, OnInit } from '@angular/core';
import { Stock } from '../Stock';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-all',
  templateUrl: './stock-all.component.html',
  styleUrls: ['./stock-all.component.css']
})
export class StockAllComponent implements OnInit {

  isFetching = false;
  error = false;
  errorMessage = null;

  stock: Stock[];

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.isFetching = true;
    this.stockService
        .getAllStock()
        .subscribe(
          stock => {
            this.stock = stock;
            this.isFetching = false;
          },
          error => {
            this.error = true;
            this.isFetching = false;
            if (error.status == 0){
              this.errorMessage = error.message;
            }
            else
              this.errorMessage = error.error.message;
          }

        )
  }

}
