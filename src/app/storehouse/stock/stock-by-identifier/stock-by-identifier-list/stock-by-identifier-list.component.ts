import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorehousesService } from 'src/app/storehouse/storehouses/storehouses.service';
import { Stock } from '../../Stock';
import { StockService } from '../../stock.service';

@Component({
  selector: 'app-stock-by-identifier-list',
  templateUrl: './stock-by-identifier-list.component.html',
  styleUrls: ['./stock-by-identifier-list.component.css']
})
export class StockByIdentifierListComponent implements OnInit, OnDestroy{

  isFetching = false;
  error = false;
  errorMessage = null;
  shelf: string;
  sub: Subscription;
  stock: Stock[];

  constructor(private stockService: StockService,
              private route: ActivatedRoute,
              private storehouseService: StorehousesService) { }

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
    let identifier: string;
    this.isFetching = true;
    if(data){
      identifier = data;
    }
    else
      identifier = this.route.snapshot.paramMap.get('identifier')

    this.stockService
      .getStockByIdentifier(identifier)
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

      this.storehouseService.getShelf(identifier).subscribe(shelf =>{
        this.shelf = shelf.identifier;
      })
  }
}
