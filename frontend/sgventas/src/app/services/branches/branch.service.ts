import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Branch } from '../../interfaces/branches.interface';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(
    private http: HttpClient
  ) { }

  get_branches():Observable<Branch[]>{
    let url_ep = `${environment.urlBase}/branches/api/v1/`
    return this.http.get<Branch[]>(url_ep)
  }

}
