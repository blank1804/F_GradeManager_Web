import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Page } from "src/shared/interface/interface";


export interface LoginModel {
  studentId: string,
  idCard: string,
}
export interface canLoginModel {
  id: number,
  studentId: string,
  preName: string,

}

@Injectable({ providedIn: 'root' })
export class LoginService {

  private resourceUrl = `${environment.apiUrl}user`;

  constructor(private http: HttpClient) { }



  login(model: LoginModel) {
    console.log(model);
    return this.http.post<any>(`${this.resourceUrl}/login`, model);
  }
}
