import { SMSModule } from './storehouse/sms.module';
import { PageNotFoundComponent } from './_pk_shared/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'sms', loadChildren:() => import('./storehouse/sms.module').then(m => m.SMSModule)},
  {path: '**', redirectTo: 'PageNotFoundComponent'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
