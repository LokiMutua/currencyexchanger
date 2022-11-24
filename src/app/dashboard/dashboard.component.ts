import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrencyRatesService } from '../core/service/currency-rates.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isSubmitted = false;
  currencies: string[] = [
    "EUR",
    "USD",
    "GBP",
  ];

  exchangeRate: string = '';
  exchangeValue!: number;
  exchangeRateValue!: number;

  convertForm = new FormGroup({});
  constructor(
    private formBuilder: FormBuilder,
    private _currencyRatesService: CurrencyRatesService,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this.convertForm = this.formBuilder.group({
      'amount': ['', Validators.required],
      'from': ['EUR', Validators.required],
      'to': ['USD', Validators.required]
    })
  }

  get f(){
    return this.convertForm.controls;
  }

  onSubmit(){
    this._currencyRatesService.convertCurrency(this.f.amount.value, this.f.from.value, this.f.to.value).subscribe(
      (data) => {
        if(data.success === true ){
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
    return this._router.navigate(['/details'], { queryParams: { from: this.f.from.value, to: this.f.to.value, amount: this.f.amount.value, exchangeRateValue: this.exchangeRateValue, exchangeValue: this.exchangeValue}});
  }
}
