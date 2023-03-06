import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import {Observable} from "rxjs";
import {LoginInterface} from "../../interfaces/auth";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  getToken(body:any): Observable<LoginInterface>{
    return this.http.post<LoginInterface>(`${environment.urlBase}/api/token/`, body)
  }

  verifyToken(token:any){
    return this.http.post(`${environment.urlBase}/api/token/verify/`, token)
  }

}
