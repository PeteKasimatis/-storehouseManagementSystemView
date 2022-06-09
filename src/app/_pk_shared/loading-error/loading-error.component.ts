import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-error',
  templateUrl: './loading-error.component.html',
  styleUrls: ['./loading-error.component.css']
})
export class LoadingErrorComponent implements OnInit {
 
  @Input()
  isFetching : boolean;
  @Input()
  error : boolean;
  @Input()
  errorMessage : string;
  
  constructor() { }

  ngOnInit() {
  }

  
}
