import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyRatesService } from '../core/service/currency-rates.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  isSubmitted = false;
  fromCurrency: string | null = null;
  toCurrency: string | null = null;
  currencies: string[] = [
    "EUR",
    "USD",
    "GBP",
  ];

  exchangeRate: string = '';
  exchangeValue: string | null = null;
  chartData: [] = [];
  chartTitle: string = '';
  exchangeRateValue: string | null = null;

  convertForm = new FormGroup({});
  constructor(
    private formBuilder: FormBuilder,
    private _currencyRatesService: CurrencyRatesService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.convertForm = this.formBuilder.group({
      'amount': [this._route.snapshot.queryParamMap.get('amount'), Validators.required],
      'from': [this._route.snapshot.queryParamMap.get('from'), Validators.required],
      'to': [this._route.snapshot.queryParamMap.get('to'), Validators.required]
    });

    this.fromCurrency = this._route.snapshot.queryParamMap.get('from');
    this.toCurrency = this._route.snapshot.queryParamMap.get('to');
    this.exchangeRate = `1 ${this.f.from.value} =  ${ this._route.snapshot.queryParamMap.get('exchangeRateValue') } ${this.f.to.value}`;
    this.exchangeValue = this._route.snapshot.queryParamMap.get('exchangeValue');

    this.chartTitle = this._route.snapshot.queryParamMap.get('from') + '-' + this._route.snapshot.queryParamMap.get('to');

    this._currencyRatesService.getHistoricalData(this.fromCurrency!, '2022-01-31', this.toCurrency!).subscribe(

    )
  }

  get f(){
    return this.convertForm.controls;
  }

  onSubmit(){
    this._currencyRatesService.convertCurrency(this.f.amount.value, this.f.from.value, this.f.to.value).subscribe(
      (data) => {
        if(data.success == true ){
          this.exchangeValue = data.result.toFixed(2);
          this.exchangeRateValue = data.info.rate.toFixed(2);
          this.isSubmitted = true;
          this.exchangeRate = `1 ${this.f.from.value} =  ${ this.exchangeRateValue } ${this.f.to.value}`;
        }

      }
    )
  }

  onChangeFromCurrency(e: any){
    this.convertForm.controls.from?.setValue(e.target.value)
  }

  onChangeToCurrency(e: any){
    this.convertForm.controls.to?.setValue(e.target.value)
  }

  onSwapCurrencies(){
    let tempFromValue = this.f.from.value;
    this.f.from.setValue(this.f.to.value)
    this.f.to.setValue(tempFromValue);
  }

  onRedirect(){
    this._router.navigate(['/dashboard']);
  }

  lastDayOfMonth(year: number, month: number){
    return new Date(year, month + 1, 0);
  }

  //Chart Configuration



}
