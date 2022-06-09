import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  active: boolean;

  constructor() { }

  ngOnInit() {
    this.active = true;
  }

  deactivate(){
    //this.active = false;
  }

}
