import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginInterface } from 'src/app/interfaces/auth';

import { LoginService } from 'src/app/services/auth/login.service';
import {Observable} from "rxjs";
import { BranchService } from 'src/app/services/branches/branch.service';
import { Branch } from '../../interfaces/branches.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login_interface: LoginInterface = {refresh:'', access: ''}
  message_error:string = ''

  branches:Branch[] = []

  ProductForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(
    private login_service: LoginService,
    private branch_service: BranchService,
    private router: Router
  ) { }

  onSubmit(){
    if (this.ProductForm.valid){
      this.login_service.getToken(this.ProductForm.value).subscribe(data => {
        this.login_interface = data;
        localStorage.setItem('token', this.login_interface.access)
        localStorage.setItem('refresh', this.login_interface.refresh)
        this.router.navigate(['/'])
      }, error => this.message_error = error.error['detail'])
    }
  }

  get_branches(){
    this.branch_service.get_branches().subscribe(
      data =>{
        this.branches = data;
      } 
    )
  }

  ngOnInit(): void {
    let login = localStorage.getItem('token');
    if (login != null){
      this.router.navigate(['/'])
    }
    this.get_branches();
  }

  get username(){
    return this.ProductForm.get('username')
  }

  get password(){
    return this.ProductForm.get('password')
  }

}
