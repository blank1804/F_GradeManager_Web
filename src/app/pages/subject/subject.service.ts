import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Page } from '../../../shared/interface/interface'
import { Observable } from 'rxjs';
// import { ComboBox} from '@shared/interface/interface';
import { environment } from 'src/environments/environment';

export interface SearchModel extends Page {
  subjectId: string,
  subjectName: string,

}
export interface SaveModel {
  sId: number,
  subjectId: string,
  subjectName: string,
  subjectCredit: string,
}

export interface GetDetail {
  sId: number;
}


@Injectable({ providedIn: 'root' })
export class SubjectService {
  private resourceUrl = `${environment.apiUrl}subject`;
  constructor(private http: HttpClient) { }


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
    console.log(model.sId);
    if (model.sId) {
      console.log(1);
      return this.http.post<any>(`${this.resourceUrl}/update`, model);
    } else {
      return this.http.post<any>(`${this.resourceUrl}/save`, model);
    }

  }

}











