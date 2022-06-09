import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExitReceipt } from '../exit-receipts/ExitReceipt';
import { EntryReceipt } from './EntryReceipt';

@Injectable({
  providedIn: 'root'
})
export class EntryReceiptsService {

  private urlGetAllEntryReceipts = 'http://localhost:8080/receipt/entry/all';
  private urlPostEntryReceipt = 'http://localhost:8080/receipt/entry/create';
  private urlDeleteEntryReceipt = 'http://localhost:8080/receipt/entry/delete/';
  private urlGetEntryReceipt = 'http://localhost:8080/receipt/entry/';
  private urlPutEntryReceipt = 'http://localhost:8080/receipt/entry/update';

  constructor(private http: HttpClient) { }

  getAllEntryReceipts(): Observable<EntryReceipt[]>{
    return this.http.get<EntryReceipt[]>(this.urlGetAllEntryReceipts);
  }

  postEntryReceipt(entryReceipt: EntryReceipt){
    return this.http.post<EntryReceipt>(this.urlPostEntryReceipt, entryReceipt);
  }

  deleteEntryReceipt(id: string){
    return this.http.delete(this.urlDeleteEntryReceipt.concat(id));
  }

  getEntryReceipt(id: string){
    return this.http.get<EntryReceipt>(this.urlGetEntryReceipt.concat(id));
  }

  putEntryReceipt(entryReceipt: EntryReceipt){
    return this.http.put<EntryReceipt>(this.urlPutEntryReceipt, entryReceipt);
  }
}
