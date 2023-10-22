import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-mounted-select',
  templateUrl: './mounted-select.component.html',
  styleUrls: ['./mounted-select.component.css'],
})
export class MountedSelectComponent implements OnInit {

  mount: number = 0;

  constructor(
    public dialogRef: MatDialogRef<MountedSelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addMount(){
    this.data.item.mount = this.mount;
    console.log(this.data, '=====')
    this.mount = 0;
    this.dialogRef.close();
  }

}
