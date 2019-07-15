import { Injectable, EventEmitter} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {Item} from 'src/app/models/item'

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private subject = new Subject<Item[]>();
  

  constructor() { }
  
  setItem(value: Item[]) {
    this.subject.next(value);
}

  clearItem() {
      this.subject.next();
  }

  getItem(): Observable<Item[]> {
      return this.subject.asObservable();
  }

}
