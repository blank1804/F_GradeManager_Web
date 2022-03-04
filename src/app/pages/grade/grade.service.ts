import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from 'src/shared/interface/interface';
import { getDetailModel } from '../subject/subject.service';

export interface SubModel {
  sId:number
  subjectId: string,
  subjectName: string,
  subjectCredit: number,
}

export interface searchGradeModel extends Page {
  id:number
}
export interface searchGrade2Model extends Page {
  id:number
}
export interface listModel {
  studentId: string,
  id: number,
  year: string,
  turm: number,
  subject1: string,
  point1: number,
  subject2: string,
  point2: number,
  subject3: string,
  point3: number,
  subject4: string,
  point4: number,
  subject5: string,
  point5: number,
  subject6: string,
  point6: number,

}

export interface subjectSelect {
  subjectId: number,
  subjectName: string,
  subjectCredit: string,
}

export interface searchG {
  gId: number,
}


export interface saveModel {
  gId:number,
  studentId: string,
  id: number,
  year: string,
  turm: number,
  subject1: string,
  point1: number,
  subject2: string,
  point2: number,
  subject3: string,
  point3: number,
  subject4: string,
  point4: number,
  subject5: string,
  point5: number,
  subject6: string,
  point6: number,

  sId1: number,
  subjectCredit1: number,
  subjectId1: string,
  sId2: number,
  subjectCredit2: number,
  subjectId2: string,
  sId3: number,
  subjectCredit3: number,
  subjectId3: string,
  sId4: number,
  subjectCredit4: number,
  subjectId4: string,
  sId5: number,
  subjectCredit5: number,
  subjectId5: string,
  sId6: number,
  subjectCredit6: number,
  subjectId6: string,

}

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  private resourceUrl = `${environment.apiUrl}subject`;
  private resourceUrl2 = `${environment.apiUrl}grade`;

  constructor(private http: HttpClient) { }

  search(model: subjectSelect, page: Page): Observable<subjectSelect[]>{
    return this.http.get<subjectSelect[]>(`${this.resourceUrl}/search`);
 }

 save(model: saveModel) {
  console.log(model);
  if (model.gId) {
    return this.http.post<any>(`${this.resourceUrl2}/update`, model);
  }else {
    return this.http.post<any>(`${this.resourceUrl2}/save`, model);
  }

}


searchGrade(model: searchGradeModel, page: Page) {
  console.log("is this go"+model);
  model.pageNumber = page.pageNumber;
  model.pageSize = page.pageSize;
  model.sorts = page.sorts;
  return this.http.post<any>(`${this.resourceUrl2}/searchGrade`, model);
}

cancel(model: getDetailModel) {
  return this.http.post<any>(`${this.resourceUrl2}/cancel`, model);
}

detail(model: searchG) {
  return this.http.post<any>(`${this.resourceUrl2}/getDetail`, model);
}

}
