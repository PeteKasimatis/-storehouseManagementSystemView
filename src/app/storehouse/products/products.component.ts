import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';
import { PKTableColumn } from '../_shared/PKTable/PKTableColumn';
import { Product } from './Product';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  isFetching = false;
  error = false;
  errorMessage = null;
  productsList: Product[];
  filterFields = ['description', 'barcode', 'units'];
  captionTitle = this.translate.instant('sms.products.list');

  constructor(private productsService: ProductsService,
              private router: Router,
              private route: ActivatedRoute,
              private translate: TranslateService) { }

  ngOnInit() {
    this.getProducts();
  }

  columns: PKTableColumn[] = [
    {align: "", width: "30%", headerTitle: this.translate.instant('sms.products.description'), isSortable: true, colName: "description"},
    {align: "center", width: "25%", headerTitle: this.translate.instant('sms.products.barcode'), isSortable: true, colName: "barcode"},
    {align: "center", width: "25%", headerTitle: this.translate.instant('sms.products.units'), isSortable: true, colName: "units"},
  ]

  onDetails(product: Product){
    this.router.navigate(['../', product.barcode], {relativeTo: this.route});
  }

  getProducts(){
    this.isFetching = true;
    this.productsService
        .getProducts()
        .subscribe(products => {
          this.productsList = products ;
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
