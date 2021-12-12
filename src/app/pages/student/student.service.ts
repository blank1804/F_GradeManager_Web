import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from '../../../shared/interface/interface'
import { Observable } from 'rxjs';
// import { ComboBox} from '@shared/interface/interface';
import { environment } from 'src/environments/environment';
export interface SearchModel extends Page {
  id: number,
  studentId: string,
  preName: string,
  firstName: string,
  lastName: string,
  fieldOfStudy: string,
  classYear: string,
  idCard:string,
}
export interface SaveModel {
  id: number,
  studentId: string,
  preName: string,
  firstName: string,
  lastName: string,
  fieldOfStudy: string,
  classYear: string,
  idCard:string,
}

export interface GetDetail {
  id: number;
}

@Injectable({ providedIn: 'root' })
export class StudentService {

  private resourceUrl = `${environment.apiUrl}student`;
  // private UrlDdl = `${environment.apiUrl}core/combobox`;

  constructor(private http: HttpClient) { }

  // search(model: SearchModel, page: Page) {
  //   model.pageNumber = page.pageNumber;
  //   model.pageSize = page.pageSize;
  //   model.sorts = page.sorts;
  //   return this.http.post<any>(`${this.resourceUrl}/search`, model);
  // }

  search(model: SearchModel, page: Page) {
    console.log(model);
    model.pageNumber = page.pageNumber;
    model.pageSize = page.pageSize;
    model.sorts = page.sorts;
    return this.http.post<any>(`${this.resourceUrl}/search`, model);
  }

  detail(model: GetDetail) {
    return this.http.post<any>(`${this.resourceUrl}/getDetail`, model);
  }

  cancel(model: GetDetail) {
    return this.http.post<any>(`${this.resourceUrl}/cancel`, model);
  }

  save(model: SaveModel) {
    console.log(model.id);
    if (model.id) {
      console.log(1);
      return this.http.post<any>(`${this.resourceUrl}/update`, model);
    } else {
      return this.http.post<any>(`${this.resourceUrl}/save`, model);
    }

  }
    // save(model: SaveModel) {
    //   return this.http.post<any>(`${this.resourceUrl}/save`, model);
    // }
}
