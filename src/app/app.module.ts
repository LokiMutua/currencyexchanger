import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { FeatherModule } from 'angular-feather';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { HeaderComponent } from './layout/app-layout/header/header.component';
import { FooterComponent } from './layout/app-layout/footer/footer.component';
import { PageLoaderComponent } from './layout/app-layout/page-loader/page-loader.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { DetailsComponent } from './details/details.component';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';
import { HistoricalDataChartComponent } from './historical-data-chart/historical-data-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageLoaderComponent,
    MainLayoutComponent,
    DashboardComponent,
    DetailsComponent,
    HistoricalDataChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true

    },
    {
      provide: NgChartsConfiguration, useValue: {
        generateColors: true
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
