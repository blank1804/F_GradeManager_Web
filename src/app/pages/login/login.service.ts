import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Page } from "src/shared/interface/interface";


export interface LoginModel extends Page {
  id: number,
  studentId: string,
  idCard: string,
}
export interface canLoginModel {
  id: number,
  studentId: string,
  idCard: string,

}
export interface wModel {
  id: number,
  studentId: string,
  preName: string,

}


@Injectable({ providedIn: 'root' })
export class LoginService {

  private resourceUrl = `${environment.apiUrl}user`;

  constructor(private http: HttpClient) { }





  login(model: LoginModel, page: Page) {
    console.log(model);
    model.pageNumber = page.pageNumber;
    model.pageSize = page.pageSize;
    model.sorts = page.sorts;
    return this.http.post<any>(`${this.resourceUrl}/login`, model);
  }
}
