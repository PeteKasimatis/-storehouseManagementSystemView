import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PKBlockUIService {

  public blockSubject = new Subject();

  constructor() { }

  block(){
    this.blockSubject.next(true);
  }

  unblock(){
    this.blockSubject.next(false);
  }
}
