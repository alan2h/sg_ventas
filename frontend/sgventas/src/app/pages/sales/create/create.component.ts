import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  show_sale_detail: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  showDetail(response:any){
    console.log(response)
    this.show_sale_detail = response;
  }

}
