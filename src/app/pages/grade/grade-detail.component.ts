import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Page } from 'src/shared/interface/interface';
import { InfoModel, SearchModel, StudentInfoService } from '../student-info/student-info.service';
import { GradeService, subjectSelect } from './grade.service';
import { SubjectService } from '../subject/subject.service';
import { SubModel } from './grade.service';
import { LoadingService } from 'src/app/core/loading/loading.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-grade-detail',
  templateUrl: './grade-detail.component.html',
  styleUrls: ['./grade-detail.component.css']
})


export class GradeDetailComponent implements OnInit {
  id: any;
  searchModel: InfoModel = {} as InfoModel;
  i = 0;
  editId: string | null = null;
  listOfData: subjectSelect = {} as subjectSelect;
  subModel:SubModel = {} as SubModel
  listOfOption: any = [];
  isLoadingOne = false;
  detail = true;
  sortName: string | null = null;
  sortValue: string | null = null;
  keyword: string = '';
  loadingTable = false;
  total = 1;
  scollTable: any;
  subjectId:any;
  subjectName:any;
  subjectCredit:any;

  gradSubmitForm = this.formBuilder.group({
    stdId: null,
    stdId2: null,
    stdId3: null,
    stdId4: null,
    stdId5: null,
    stdId6: null,
    stdId7: null,

  });

  page = new Page();
  constructor(
    private formBuilder: FormBuilder,
    private sv: GradeService,
    private loading: LoadingService,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private route: ActivatedRoute,
    private gradeService: GradeService,
    private studentinfoService: StudentInfoService,
    private gradeservice:GradeService,
    private subjectService:SubjectService,)

   { }

  ngOnInit(): void {
    // this.search(true);
    // console.log(this.listOfOption);
    // this.id = this.route.snapshot.params['id'];
    // this.studentinfoService.search(this.id).subscribe( data => {
    //   this.searchModel = data;
    // });
  }

  // search(flag: any): void {
  //   Object.assign(this.searchModel, this.keyword);
  //   this.subjectService.search(this.searchModel, this.page).pipe(
  //     finalize(() => {
  //     }))
  //     .subscribe((res: any) => {
  //       this.loadingTable = false;
  //       this.total = res.total;
  //       this.listOfOption = res;
  //       console.log(this.listOfOption);
  //     },
  //       error => {

  //       });
  // }



}
