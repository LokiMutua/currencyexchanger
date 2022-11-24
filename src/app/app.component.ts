import { PlatformLocation } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, Event } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Currency Exchanger';
  currentUrl: string = '';

  constructor(
    private spinner: NgxSpinnerService,
    location: PlatformLocation,
    public _router: Router,
  ){

    this._router.events.subscribe((routerEvent: Event)=>{
      if(routerEvent instanceof NavigationStart){
        this.spinner.show();
        location.onPopState(()=>{
          window.location.reload();
        });
        this.currentUrl = routerEvent.url.substring(
          routerEvent.url.lastIndexOf('/') + 1
        )
      }
      if(routerEvent instanceof NavigationEnd){
        this.spinner.hide();
      }

      window.scroll(0,0);
    })
  }
}
