import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface SearchModel {
  id: number,
}
export interface InfoModel {
  id: number,
  studentId: string,
  preName: string,
  firstName: string,
  lastName: string,
  fieldOfStudy: string,
  classYear: string,
  idCard: string,
}
@Injectable({ providedIn: 'root' })
export class StudentInfoService {

  private resourceUrl = `${environment.apiUrl}user`;

  constructor(private http: HttpClient) { }

  search(model: SearchModel) {
    console.log(model);
    return this.http.post<any>(`${this.resourceUrl}/searchInfo`, model);
  }
}
