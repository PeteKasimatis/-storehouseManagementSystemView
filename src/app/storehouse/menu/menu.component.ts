import { LanguageService } from '../../_pk_shared/translate/language.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';

interface LangOption {
  label: string;
  value:string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: MenuItem[];

  currentLanguage = this.translateService.currentLang;

  constructor(
    private translateService: TranslateService,
    private languageService: LanguageService
  )
  {

   }

  ngOnInit() {

    this.items = [
      {
        label: this.translateService.instant('sms.menu.storehouses'), icon: 'fa fa-building', items: [
          {label: this.translateService.instant('sms.menu.show_all'), icon: 'fa fa-list', routerLink: ['/storehouses/list']},
          {label: this.translateService.instant('sms.menu.create'), icon: 'fa fa-plus', routerLink: ['/storehouses/new']}
        ],
      },
      {
        label: this.translateService.instant('sms.menu.products'), icon: 'fa fa-shopping-bag', items: [
          {label: this.translateService.instant('sms.menu.show_all'), icon: 'fa fa-list', routerLink: ['/products/list']},
          {label: this.translateService.instant('sms.menu.create'), icon: 'fa fa-plus', routerLink: ['/products/new']}
        ],
      },
      {
        label: this.translateService.instant('sms.menu.import_receipts'), icon: 'fa fa-file-text', items: [
          {label: this.translateService.instant('sms.menu.show_all'), icon: 'fa fa-list', routerLink: ['/import-receipts/list']},
          {label: this.translateService.instant('sms.menu.create'), icon: 'fa fa-plus', routerLink: ['/import-receipts/new']}
        ],
      },
      {
        label: this.translateService.instant('sms.menu.export_receipts'), icon: 'fa fa-file-text', items: [
          {label: this.translateService.instant('sms.menu.show_all'), icon: 'fa fa-list', routerLink: ['/export-receipts/list']},
          {label: this.translateService.instant('sms.menu.create'), icon: 'fa fa-plus', routerLink: ['/export-receipts/new']}
        ],
      },
      {
        label: this.translateService.instant('sms.menu.stock'), icon: 'fa fa-archive', items: [
          {label: this.translateService.instant('sms.menu.stockAll'), icon: 'fa fa-list', routerLink: ['/export-receipts/list']},
          {label: this.translateService.instant('sms.menu.stockByShelf'), icon: 'fa fa-plus', routerLink: ['/export-receipts/new']},
          {label: this.translateService.instant('sms.menu.stockByProduct'), icon: 'fa fa-plus', routerLink: ['/export-receipts/new']},
          {label: this.translateService.instant('sms.menu.stockByDate'), icon: 'fa fa-plus', routerLink: ['/export-receipts/new']}
        ],
      }
    ];
}

  changeLanguage(newLang: string){
    this.languageService.changeLanguage(newLang);
  }
}
