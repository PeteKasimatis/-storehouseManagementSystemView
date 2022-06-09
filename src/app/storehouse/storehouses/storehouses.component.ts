import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';
import { PKTableColumn } from '../_shared/PKTable/PKTableColumn';
import { Storehouse } from './Storehouse';
import { StorehousesService } from './storehouses.service';


@Component({
  selector: 'app-storehouses',
  templateUrl: './storehouses.component.html',
  styleUrls: ['./storehouses.component.css']
})
export class StorehousesComponent implements OnInit {

  isFetching = false;
  error = false;
  errorMessage = null;
  filterFields = ['description'];
  captionTitle = this.translate.instant('sms.storehouses.list');

  storehouseList: Storehouse[];

  constructor( private storehousesService: StorehousesService,
               private router: Router,
               private route: ActivatedRoute,
               private translate: TranslateService) { }

  ngOnInit(){
    this.getStorehouses();
  }

  columns: PKTableColumn[] = [
    {align: "", width: "80%", headerTitle: this.translate.instant('sms.general.description'), isSortable: true, colName: "description"}
  ]

  getStorehouses(){
    this.isFetching = true;
    this.storehousesService
        .getStorehouses()
        .subscribe(
          storehouses =>{
            this.storehouseList = storehouses;
            this.isFetching = false;
          },
          error => {
            this.error = true;
            this.errorMessage = error.message;
            this.isFetching = false;
          }
        );
  }

  onDetails(id){
    this.router.navigate(['../view/', id], {relativeTo: this.route});
  }
}
