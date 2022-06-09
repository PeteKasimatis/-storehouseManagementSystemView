import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExitReceipt } from './ExitReceipt';

@Injectable({
  providedIn: 'root'
})
export class ExitReceiptsService {

  private urlGetAllExitReceipts = 'http://localhost:8080//receipt/exit/all';
  private urlPostExitReceipt = 'http://localhost:8080//receipt/exit/create';
  private urlDeleteExitReceipt = 'http://localhost:8080/receipt/exit/delete/';
  private urlGetExitReceipt = 'http://localhost:8080/receipt/exit/';
  private urlPutExitReceipt = 'http://localhost:8080/receipt/exit/update';

  constructor(private http: HttpClient) { }

  getAllExitReceipts(): Observable<ExitReceipt[]>{
    return this.http.get<ExitReceipt[]>(this.urlGetAllExitReceipts);
  }

  postExitReceipt(exitReceipt: ExitReceipt){
    return this.http.post(this.urlPostExitReceipt, exitReceipt);
  }

  deleteExitReceipt(id: string){
    return this.http.delete(this.urlDeleteExitReceipt.concat(id));
  }

  getExitReceipt(id: string){
    return this.http.get<ExitReceipt>(this.urlGetExitReceipt.concat(id));
  }

  putExitReceipt(exitReceipt: ExitReceipt){
    return this.http.put<ExitReceipt>(this.urlPutExitReceipt, exitReceipt);
  }
}
