import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  currentLanguage = this.translateService.currentLang;


  constructor(public translateService: TranslateService) { }

  changeLanguage(newLanguage) {
    if (newLanguage !== this.currentLanguage) {
      this.translateService.use(newLanguage).subscribe(() => {
        localStorage.setItem('language', newLanguage);
        window.location.reload();
        console.log(this.translateService.currentLang);

      });
    }
  }
}
