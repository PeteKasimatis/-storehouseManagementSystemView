import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { EntryReceiptsService } from './entry-receipts.service';
import { EntryReceipt } from './EntryReceipt';
import { PKTableColumn } from '../_shared/PKTable/PKTableColumn';

@Component({
  selector: 'app-entry-receipts',
  templateUrl: './entry-receipts.component.html',
  styleUrls: ['./entry-receipts.component.css']
})
export class EntryReceiptsComponent implements OnInit {

  isFetching = false;
  error = false;
  errorMessage = null;
  entryReceiptList: EntryReceipt[];
  filterFields = ['dateOfEntry', 'description', 'recipient'];
  captionTitle = this.translate.instant('sms.import-receipts.list');

  constructor(private entryReceiptService: EntryReceiptsService,
              private router: Router,
              private route: ActivatedRoute,
              private translate: TranslateService) { }

  ngOnInit() {
    this.getEntryRecepts();
  }

  columns: PKTableColumn[] = [
    {align: "center", width: "10%", headerTitle: this.translate.instant('sms.general.date'), isSortable: true, colName: "dateOfEntry"},
    {align: "", width: "30%", headerTitle: this.translate.instant('sms.general.description'), isSortable: true, colName: "description"},
    {align: "", width: "30%", headerTitle: this.translate.instant('sms.general.recipient'), isSortable: true, colName: "recipient"},
  ]

  getEntryRecepts(){
      this.isFetching = true;
      this.entryReceiptService
          .getAllEntryReceipts()
          .subscribe(entryReceipts => {
            this.entryReceiptList = entryReceipts ;
            this.isFetching = false;
            },
            error =>{
              this.error = true;
              this.errorMessage = error.message;
              this.isFetching = false;
            }
          );
  }

  onDetails(stock){
    this.router.navigate(['../', stock.id], {relativeTo: this.route});
  }
}
