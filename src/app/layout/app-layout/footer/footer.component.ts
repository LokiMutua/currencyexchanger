import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  calendarYear: number = 2022;
  constructor() { }

  ngOnInit(): void {
    let d = new Date();
    this.calendarYear = d.getFullYear();
  }

}
