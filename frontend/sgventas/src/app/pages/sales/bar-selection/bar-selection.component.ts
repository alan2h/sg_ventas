import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TypePay } from 'src/app/interfaces/typePay';

class SenderEmitter {
  show: boolean | undefined;
  select: string | undefined;
}

@Component({
  selector: 'app-bar-selection',
  templateUrl: './bar-selection.component.html',
  styleUrls: ['./bar-selection.component.css']
})
export class BarSelectionComponent implements OnInit {

  @Output() selecTypePay: EventEmitter<SenderEmitter> = new EventEmitter();
  type_pay:any = new TypePay();
  select = '';

  constructor() { }

  ngOnInit(): void {
  }

  selection(select:string){
    this.select = select;
    let send_emiter = new SenderEmitter();
    send_emiter.show = true;
    send_emiter.select = this.select;
    this.selecTypePay.emit(send_emiter);
  }

}
