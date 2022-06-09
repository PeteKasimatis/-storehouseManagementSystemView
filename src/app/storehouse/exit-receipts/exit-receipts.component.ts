import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { ExitReceiptsService } from './exit-receipts.service';
import { ExitReceipt } from './ExitReceipt';
import { PKTableColumn } from '../_shared/PKTable/PKTableColumn';

@Component({
  selector: 'app-exit-receipts',
  templateUrl: './exit-receipts.component.html',
  styleUrls: ['./exit-receipts.component.css']
})
export class ExitReceiptsComponent implements OnInit {

  isFetching = false;
  error = false;
  errorMessage = null;
  exitReceiptList: ExitReceipt[];
  filterFields = ['dateOfExit', 'reasonForExit', 'sender'];
  captionTitle = this.translate.instant('sms.export-receipts.list');

  constructor(private exitReceiptsService: ExitReceiptsService,
              private router: Router,
              private route: ActivatedRoute,
              private translate: TranslateService) { }

  ngOnInit() {
    this.getExitRecepts();
  }

  columns: PKTableColumn[] = [
    {align: "center", width: "10%", headerTitle: this.translate.instant('sms.general.date'), isSortable: true, colName: "dateOfExit"},
    {align: "", width: "30%", headerTitle: this.translate.instant('sms.general.reason'), isSortable: true, colName: "reasonForExit"},
    {align: "", width: "30%", headerTitle: this.translate.instant('sms.general.sender'), isSortable: true, colName: "sender"},
  ]

  getExitRecepts(){
    this.isFetching = true;
    this.exitReceiptsService
        .getAllExitReceipts()
        .subscribe(exitReceipts => {
          this.exitReceiptList = exitReceipts ;
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
