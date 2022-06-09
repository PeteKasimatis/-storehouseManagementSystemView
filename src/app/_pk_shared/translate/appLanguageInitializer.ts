import { LOCATION_INITIALIZED } from "@angular/common";
import { Injector } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

const defaultLanguage = 'el';
const appLanguage = localStorage.getItem('language');
let langToSet = appLanguage ? appLanguage : defaultLanguage;


export function appLanguageInitializer(translate: TranslateService, injector: Injector) {

  return () => new Promise<any>((resolve: any) => {
    const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
    locationInitialized.then(() => {
      translate.use(langToSet).subscribe(() => {
      }, err => {
      }, () => {
        resolve(null);
      });
    });
  });
}
