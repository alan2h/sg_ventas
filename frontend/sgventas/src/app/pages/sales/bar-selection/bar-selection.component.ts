import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TypePay } from 'src/app/interfaces/typePay';

@Component({
  selector: 'app-bar-selection',
  templateUrl: './bar-selection.component.html',
  styleUrls: ['./bar-selection.component.css']
})
export class BarSelectionComponent implements OnInit {

  @Output() selecTypePay: EventEmitter<Boolean> = new EventEmitter();
  type_pay:any = new TypePay(); 
  select = '';

  constructor() { }

  ngOnInit(): void {
  }

  selection(select:string){ 
    this.select = select; 
    this.selecTypePay.emit(true);
  }

}
