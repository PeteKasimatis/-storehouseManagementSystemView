import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../products/products.service';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-by-date',
  templateUrl: './stock-by-date.component.html',
  styleUrls: ['./stock-by-date.component.css']
})
export class StockByDateComponent implements OnInit {

  isFetching = false;
  error = false;
  errorMessage = null;
  barcodeList: string[] = [];
  searchElementsArray: string[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private stockService: StockService,
              private productsService: ProductsService) { }

  ngOnInit() {
    this.getProducts();
  }

  stockByDateForm = this.formBuilder.group({
    barcode: [''],
    date: []
  })

  onGetStock(){
    this.router.navigate([this.stockByDateForm.value.barcode, this.stockByDateForm.value.date], {relativeTo: this.route});
    this.searchElementsArray.push(this.stockByDateForm.value.barcode, this.stockByDateForm.value.date);
    this.stockService.searchElements.next(this.searchElementsArray);
    this.searchElementsArray = [];
  }

  getProducts(){
    this.productsService
    .getProducts()
    .subscribe(products => {
      products.forEach(product => this.barcodeList.push(product.barcode))
      this.isFetching = false;
    },
      error =>{
        this.error = true;
        this.errorMessage = error.message;
        this.isFetching = false;
      }
    );
  }
}
