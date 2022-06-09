import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorehousesService } from '../../storehouses/storehouses.service';
import { Stock } from '../Stock';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-by-identifier',
  templateUrl: './stock-by-identifier.component.html',
  styleUrls: ['./stock-by-identifier.component.css']
})
export class StockByIdentifierComponent implements OnInit {

  isFetching = false;
  error = false;
  errorMessage = null;
  identifierList: string[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private stockService: StockService,
              private storehousesService: StorehousesService) { }

  ngOnInit() {
    this.getShelves();
  }

  stockByIdentifierForm = this.formBuilder.group({
    identifier: ['']
  })

  onGetStock(){
    this.router.navigate([this.stockByIdentifierForm.value.identifier], {relativeTo: this.route});
    this.stockService.searchElement.next(this.stockByIdentifierForm.value.identifier);
  }


  getShelves(){
    this.storehousesService
    .getAllShelves()
    .subscribe(shelves => {
      shelves.forEach(shelf => this.identifierList.push(shelf.identifier))
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
