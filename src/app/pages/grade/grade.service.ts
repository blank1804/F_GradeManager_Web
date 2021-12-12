import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from 'src/shared/interface/interface';

export interface SubModel {
  sId:number
  subjectId: string,
  subjectName: string,
  subjectCredit: number,
}

export interface subjectSelect {
  subjectId: number,
  subjectName: string,
  subjectCredit: string,
}

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  private resourceUrl = `${environment.apiUrl}subject`;

  constructor(private http: HttpClient) { }

  search(model: subjectSelect, page: Page): Observable<subjectSelect[]>{
    return this.http.get<subjectSelect[]>(`${this.resourceUrl}/search`);
 }

}
