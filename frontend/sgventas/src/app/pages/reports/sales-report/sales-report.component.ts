import { Component, OnInit } from '@angular/core';



const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {



  constructor() { }

  ngOnInit(): void {
  }

}
