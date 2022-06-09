import { PageNotFoundComponent } from './../page-not-found/page-not-found.component';
import { LoadingErrorComponent } from './../loading-error/loading-error.component';
import { PrintErrorComponent } from './../print-error/print-error.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MenubarModule} from 'primeng/menubar';
import {SharedModule} from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { CalendarModule } from 'primeng/calendar';
import { TranslateModule } from '@ngx-translate/core';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import { PKTableComponent } from 'src/app/storehouse/_shared/PKTable/pktable.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {BlockUIModule} from 'primeng/blockui';



@NgModule({
  declarations: [
    PrintErrorComponent,
    LoadingErrorComponent,
    PageNotFoundComponent,
    PKTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MenubarModule,
    SharedModule,
    TabViewModule,
    ButtonModule,
    DropdownModule,
    OverlayPanelModule,
    BrowserAnimationsModule,
    TableModule,
    MessageModule,
    MessagesModule,
    CalendarModule,
    CardModule,
    InputTextModule,
    TranslateModule,
    InputTextareaModule,
    ConfirmDialogModule,
    BlockUIModule

  ],
  exports: [
    PrintErrorComponent,
    LoadingErrorComponent,
    PageNotFoundComponent,
    PKTableComponent,

    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MenubarModule,
    SharedModule,
    ButtonModule,
    DropdownModule,
    OverlayPanelModule,
    BrowserAnimationsModule,
    TableModule,
    MessageModule,
    MessagesModule,
    CalendarModule,
    TranslateModule,
    CardModule,
    InputTextModule,
    InputTextareaModule,
    ConfirmDialogModule,
    BlockUIModule
  ]
})
export class PKSharedModule {
}
