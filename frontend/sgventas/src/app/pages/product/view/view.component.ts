import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ChangeDetectionStrategy, SimpleChange, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/interfaces/products';


@Component({
	selector: 'ngbd-modal-content',
	standalone: true,
	imports:[CommonModule],
	template: `
		<div class="modal-header">
			<h4 class="modal-title">Detalle del producto</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">
		<table class="table">
				<thead>
					<tr>
					<th scope="col">Datos</th>
					<th scope="col">Valor</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">Nombre</th>
						<td>{{ product.name }}</td>
					</tr>
					<tr>
						<th scope="row">Descripcion</th>
						<td>{{ product.description }}</td>
					</tr>
					<tr>
						<th scope="row">Precio venta</th>
						<td>{{ product.price_sale| currency }}</td>
					</tr>
					<tr>
						<th scope="row">Precio compra</th>
						<td>{{ product.price_buy| currency }}</td>
					</tr>
					<tr>
						<th scope="row">Stock</th>
						<td>{{ product.stock }}</td>
					</tr>
				</tbody>
				</table>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Cerrar</button>
		</div>
	`,
})
export class NgbdModalContent {
	@Input() name:any;
	@Input() product: any;
	constructor(public activeModal: NgbActiveModal) {}


}

@Component({
  selector: 'app-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './view.component.html',
  providers: [ NgbModalConfig, NgbModal ],
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnChanges {

  @Input() open_view: boolean = false;
  @Input() item: Product | undefined = undefined;
  @Output() openView = new EventEmitter<boolean>();

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
		// customize default values of modals used by this component tree
		config.backdrop = 'static';
		config.keyboard = true;
	
	}
  ngOnChanges(changes: SimpleChanges): void {
     console.log(changes['open_view'].currentValue)
     if (changes['open_view'].currentValue){
      this.open_view = true;
      this.open()
     }
  }

  ngOnInit(): void {
    
  }



	open() {
		let modal =  this.modalService.open(NgbdModalContent);
		modal.componentInstance.name = 'ACAAAA'
		modal.componentInstance.product = this.item;
	    modal.result.then(
			(result) => {
				this.openView.emit(false);		
			},
			(reason) => {
				this.openView.emit(false);
			},
		);
	}
}
