import { Component, Inject, Output, EventEmitter } from '@angular/core';

import {MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-animations-dialog',
  templateUrl: './dialog-animations-dialog.component.html',
  styleUrls: ['./dialog-animations-dialog.component.css'],
  standalone: true
})
export class DialogAnimationsDialogComponent {

  @Output() submitClicked = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<DialogAnimationsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number, name: string}
  ) {}

  closeDialog() {

    this.dialogRef.close();
  }

  closeAndConfirm(){
    this.dialogRef.close(this.data);
  }

}
