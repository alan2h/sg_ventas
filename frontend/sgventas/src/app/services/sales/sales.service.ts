import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SaleClass, SaleInterface } from 'src/app/interfaces/sales.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  headers = new HttpHeaders();

  constructor(
    private http: HttpClient
  ) {
    this.headers = this.headers.append('authorization', `Bearer ${localStorage.getItem('token')}`);
  }

  getSale(id: string): Observable<SaleInterface>{
    return this.http.get<SaleInterface>(`${environment.urlBase}/sales/api/v1/${id}/`, {'headers': this.headers})
  }

}
