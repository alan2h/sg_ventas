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

}
