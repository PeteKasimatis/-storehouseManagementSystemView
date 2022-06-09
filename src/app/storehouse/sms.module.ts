import { ProductsComponent } from './products/products.component';
import { ProductsDetailsComponent } from './products/products-details/products-details.component';
import { PKSharedModule } from './../_pk_shared/pk_shared-module/pk_shared.module';
import { MenuComponent } from './menu/menu.component';
import { StorehousesComponent } from './storehouses/storehouses.component';
import { StorehousesDetailsComponent } from './storehouses/storehouses-details/storehouses-details.component';
import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { smsRoutes } from './sms.routing';
import { EntryReceiptsComponent } from './entry-receipts/entry-receipts.component';
import { ExitReceiptsCreateComponent } from './exit-receipts/exit-receipt-create/exit-receipts-create.component';
import { EntryReceiptsCreateComponent } from './entry-receipts/entry-receipts-create/entry-receipts-create.component';
import { EntryReceiptsDetailsComponent } from './entry-receipts/entry-receipts-details/entry-receipts-details.component';
import { StockByBarcodeComponent } from './stock/stock-by-barcode/stock-by-barcode.component';
import { StockAllComponent } from './stock/stock-all/stock-all.component';
import { StockByDateComponent } from './stock/stock-by-date/stock-by-date.component';
import { StockByBarcodeListComponent } from './stock/stock-by-barcode/stock-by-barcode-list/stock-by-barcode-list.component';
import { StockByIdentifierComponent } from './stock/stock-by-identifier/stock-by-identifier.component';
import { StockByIdentifierListComponent } from './stock/stock-by-identifier/stock-by-identifier-list/stock-by-identifier-list.component';
import { StockByDateListComponent } from './stock/stock-by-date/stock-by-date-list/stock-by-date-list.component';
import { StockComponent } from './stock/stock.component';
import { ShelfDetailComponent } from './storehouses/shelfs/shelfs-details/shelf-detail.component';
import { ExitReceiptsComponent } from './exit-receipts/exit-receipts.component';
import { ExitReceiptsDetailsComponent } from './exit-receipts/exit-receipt-details/exit-receipts-details.component';
import { StorehousesViewComponent } from './storehouses/storehouses-view/storehouses-view.component';
import { ProductsViewComponent } from './products/products-view/products-view.component';

@NgModule({
  declarations:[
    StorehousesDetailsComponent,
    StorehousesComponent,
    StorehousesViewComponent,
    ProductsDetailsComponent,
    ProductsViewComponent,
    ProductsComponent,
    MenuComponent,
    EntryReceiptsComponent,
    EntryReceiptsCreateComponent,
    EntryReceiptsDetailsComponent,
    ExitReceiptsComponent,
    ExitReceiptsDetailsComponent,
    ExitReceiptsCreateComponent,
    StockComponent,
    StockAllComponent,
    StockByBarcodeComponent,
    StockByIdentifierComponent,
    StockByDateComponent,
    ShelfDetailComponent,
    StockByBarcodeListComponent,
    StockByIdentifierListComponent,
    StockByDateListComponent
  ],
  imports:[
    RouterModule.forChild(smsRoutes),
    PKSharedModule
  ],
  exports: [
    MenuComponent
  ]
})
export class SMSModule{

}
