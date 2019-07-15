import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {Item} from 'src/app/models/item'

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() { }

  private subject = new Subject<boolean>();
   
  setSpinner(value: boolean) {
    this.subject.next(value);
  }

  clearSpinner() {
      this.subject.next();
  }

  getSpinner(): Observable<boolean> {
      return this.subject.asObservable();
  }
}


