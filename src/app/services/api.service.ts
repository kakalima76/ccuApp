import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Item } from 'src/app/models/item';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

const apiUrl = 'https://ccu-leilao.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getItens (): Observable<Item[]> {
    return this.http.get<Item[]>(apiUrl)
      .pipe(
        tap(itens => console.log('loaded data')),
        catchError(this.handleError('getProdutos', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
