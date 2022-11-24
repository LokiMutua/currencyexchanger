import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyRatesService {


  constructor(private http: HttpClient) { }


  convertCurrency(amount: number, from: string, to: string): Observable<any>{
    return this.http.get(`${environment.API_URL}/convert?to=${to}&from=${from}&amount=${amount}`);
  }

  getHistoricalData(baseSymbol: string, date: string, symbol: string){
   return this.http.get(`${environment.API_URL}/${date}?symbols=${symbol}&base=${baseSymbol}`)
  }
}
