import { Component, OnInit } from '@angular/core';

import { faFolderOpen, faFolder } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  faFolderProduct = faFolder;
  cssProduct = 'collapse'

  faFolderClient = faFolder;
  cssClient = 'collapse'

  faFolderSale = faFolder;
  cssSale = 'collapse'

  constructor() { }

  ngOnInit(): void {
  }

  changeStateProduct(){
    if (this.faFolderProduct == faFolder){
       this.faFolderProduct = faFolderOpen;
    }else {
       this.faFolderProduct = faFolder;
    }
    if (this.cssProduct == 'collapse'){
       this.cssProduct = 'collapse show'
    }else{
      this.cssProduct = 'collapse'
    }

  }


  changeStateSale(){
    if (this.faFolderSale == faFolder){
       this.faFolderSale = faFolderOpen;
    }else {
       this.faFolderSale = faFolder;
    }
    if (this.cssSale == 'collapse'){
       this.cssSale = 'collapse show'
    }else{
      this.cssSale = 'collapse'
    }

  }


  changeStateClient(){
    if (this.faFolderClient == faFolder){
       this.faFolderClient = faFolderOpen;
    }else {
       this.faFolderClient = faFolder;
    }
    if (this.cssClient == 'collapse'){
       this.cssClient = 'collapse show'
    }else{
      this.cssClient = 'collapse'
    }

  }

}
