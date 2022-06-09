import { Router, ActivatedRoute } from '@angular/router';
import { PKTableColumn } from './PKTableColumn';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-pktable',
  templateUrl: './pktable.component.html',
  styleUrls: ['./pktable.component.css']
})
export class PKTableComponent implements OnInit {

  @ViewChild('table') table: Table;

  @Input() values: any[]; // rowValues
  @Input() filterFields: string[]; // fields that can be filtered
  @Input() columns: PKTableColumn[];
  @Input() captionTitle: any;
  @Input() showDetailsButton: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  onDetails(id){
    this.router.navigate(['../view/', id],{relativeTo: this.route})
  }

  applyFilterGlobal($event) {
    this.table.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }
}
