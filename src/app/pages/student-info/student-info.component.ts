import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AbstractPageComponent } from 'src/app/abstract-page.component';
import { PageStateService } from 'src/app/service/page-state.service';
import {  InfoModel, SearchModel, StudentInfoService } from './student-info.service';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent extends AbstractPageComponent implements OnInit {

  searchModel: SearchModel = {} as SearchModel;
  InfoModel: InfoModel = {} as InfoModel;
  studentdata = [];
  constructor(
    private sv: StudentInfoService,
    private route: ActivatedRoute,
    private pageState: PageStateService,
) {
  super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.search(this.pageState.getParams().id);
  }

  search(id:number): void {
    this.searchModel.id = id;
    this.sv.search(this.searchModel).pipe(
      finalize(() => {
      }))
      .subscribe((res: any) => {
        Object.assign(this.InfoModel,res);
      });

  }
}

