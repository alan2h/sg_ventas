import { Component, Input, OnInit, ChangeDetectionStrategy, SimpleChange, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
	selector: 'ngbd-modal-content',
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title">Hi there!</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">
			<p>Hello, {{ name }}!</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
		</div>
	`,
})
export class NgbdModalContent {
	@Input() name:any;
	
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
