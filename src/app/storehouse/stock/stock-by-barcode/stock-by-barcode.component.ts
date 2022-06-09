import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../products/products.service';
import { StockService } from '../stock.service';
import { StockByBarcodeListComponent } from './stock-by-barcode-list/stock-by-barcode-list.component';

@Component({
  selector: 'app-stock-by-barcode',
  templateUrl: './stock-by-barcode.component.html',
  styleUrls: ['./stock-by-barcode.component.css']
})
export class StockByBarcodeComponent implements OnInit {

  isFetching = false;
  error = false;
  errorMessage = null;
  barcodeList: string[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private stockService: StockService,
              private productsService: ProductsService) { }

  stockByBarcodeForm = this.formBuilder.group({
    barcode: []
  });

  ngOnInit() {
    this.getProducts();
  }

  onGetStock(){
    this.router.navigate([this.stockByBarcodeForm.value.barcode], {relativeTo: this.route});
    this.stockService.searchElement.next(this.stockByBarcodeForm.value.barcode);
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
