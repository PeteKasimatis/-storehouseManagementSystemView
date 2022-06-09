import { ExitReceiptsDetailsComponent } from './exit-receipts/exit-receipt-details/exit-receipts-details.component';
import { ExitReceiptsCreateComponent } from './exit-receipts/exit-receipt-create/exit-receipts-create.component';
import { ExitReceiptsComponent } from './exit-receipts/exit-receipts.component';
import { EntryReceiptsDetailsComponent } from './entry-receipts/entry-receipts-details/entry-receipts-details.component';
import { EntryReceiptsCreateComponent } from './entry-receipts/entry-receipts-create/entry-receipts-create.component';
import { EntryReceiptsComponent } from './entry-receipts/entry-receipts.component';
import { ProductsDetailsComponent } from './products/products-details/products-details.component';
import { ProductsComponent } from './products/products.component';
import { StorehousesDetailsComponent } from './storehouses/storehouses-details/storehouses-details.component';
import { StorehousesViewComponent } from './storehouses/storehouses-view/storehouses-view.component';
import { StorehousesComponent } from './storehouses/storehouses.component';
import { Routes } from "@angular/router";
import { StockComponent } from './stock/stock.component';
import { StockAllComponent } from './stock/stock-all/stock-all.component';
import { StockByBarcodeComponent } from './stock/stock-by-barcode/stock-by-barcode.component';
import { StockByBarcodeListComponent } from './stock/stock-by-barcode/stock-by-barcode-list/stock-by-barcode-list.component';
import { StockByIdentifierComponent } from './stock/stock-by-identifier/stock-by-identifier.component';
import { StockByIdentifierListComponent } from './stock/stock-by-identifier/stock-by-identifier-list/stock-by-identifier-list.component';
import { StockByDateComponent } from './stock/stock-by-date/stock-by-date.component';
import { StockByDateListComponent } from './stock/stock-by-date/stock-by-date-list/stock-by-date-list.component';
import { ShelfDetailComponent } from './storehouses/shelfs/shelfs-details/shelf-detail.component';
import { ProductsViewComponent } from './products/products-view/products-view.component';

export const smsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'storehouses',
        children: [
          {
            path: 'list', component: StorehousesComponent, //canActivate: [AuthGuard],
          },
          {
            path: 'new', component: StorehousesViewComponent, //canActivate: [AuthGuard],
          },
          {
            path: 'view/:id', component: StorehousesViewComponent,// canActivate: [AuthGuard],
            //resolve: {record: PropertyResolver},
          }
        ]
      },
      {path: 'shelf/:identifier', component: ShelfDetailComponent},
      {
        path: 'products',
        children: [
          {
            path: 'list', component: ProductsComponent, //canActivate: [AuthGuard],
          },
          {
            path: 'new', component: ProductsViewComponent, //canActivate: [AuthGuard],
          },
          {
            path: 'view/:id', component: ProductsViewComponent,// canActivate: [AuthGuard],
            //resolve: {record: PropertyResolver},
          }
        ]
      },
      {
        path: 'import-receipts',
        children: [
          {
            path: 'list', component: EntryReceiptsComponent, //canActivate: [AuthGuard],
          },
          {
            path: 'new', component: EntryReceiptsCreateComponent, //canActivate: [AuthGuard],
          },
          {
            path: 'view/:id', component: EntryReceiptsDetailsComponent,// canActivate: [AuthGuard],
            //resolve: {record: PropertyResolver},
          }
        ]
      },
      {
        path: 'export-receipts',
        children: [
          {
            path: 'list', component: ExitReceiptsComponent, //canActivate: [AuthGuard],
          },
          {
            path: 'new', component: ExitReceiptsCreateComponent, //canActivate: [AuthGuard],
          },
          {
            path: 'view/:id', component: ExitReceiptsDetailsComponent,// canActivate: [AuthGuard],
            //resolve: {record: PropertyResolver},
          }
        ]
      },
      {path: 'stock', component: StockComponent,
        children:
        [
          {
            path: 'all', component: StockAllComponent,
          },
          {
            path: 'barcode', component: StockByBarcodeComponent,
              children:[
                {
                  path: ':barcode', component: StockByBarcodeListComponent,
                }
              ]
          },
          {
            path: 'identifier', component: StockByIdentifierComponent,
              children: [
                {
                  path: ':identifier', component: StockByIdentifierListComponent,
                }
                ]
            },
          {
            path: 'date', component: StockByDateComponent,
              children:[
                {
                  path: ':barcode/:date', component: StockByDateListComponent,
                }
              ]
          }
        ]
      },
    ]
  }
]
