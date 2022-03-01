import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Page } from 'src/shared/interface/interface';
import { InfoModel, SearchModel, StudentInfoService } from '../student-info/student-info.service';
import { GradeService, saveModel, searchG, subjectSelect } from './grade.service';
import { getDetailModel, sbSearchModel, SubjectService } from '../subject/subject.service';
import { SubModel } from './grade.service';
import { LoadingService } from 'src/app/core/loading/loading.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormBuilder, Validators } from '@angular/forms';
import { PageStateService } from 'src/app/service/page-state.service';
@Component({
  selector: 'app-grade-detail',
  templateUrl: './grade-detail.component.html',
  styleUrls: ['./grade-detail.component.css']
})


export class GradeDetailComponent implements OnInit {
  myID: number | undefined;
  label:any = [];
  InfoModel: InfoModel = {} as InfoModel;
  saveModel: saveModel = {} as saveModel;
  searchGModel: searchG = {} as searchG;
  id: any;
  searchModel: InfoModel = {} as InfoModel;
  i = 0;
  editId: string | null = null;
  listOfData: subjectSelect = {} as subjectSelect;
  subModel: sbSearchModel = {} as sbSearchModel;
  listOfSubject: any = [];
  listOfOption: any = [];
  isLoadingOne = false;
  detail = true;
  sortName: string | null = null;
  sortValue: string | null = null;
  keyword: string = '';
  loadingTable = false;
  total = 1;
  scollTable: any;
  subjectId: any;
  subjectName: any;
  subjectCredit: any;

  gradSubmitForm = this.formBuilder.group({
    studentId: null,
    id: null,
    year: null,
    turm: null,

    subject1: null,
    point1: null,
    subject2: null,
    point2: null,
    subject3: null,
    point3: null,
    subject4: null,
    point4: null,
    subject5: null,
    point5: null,
    subject6: null,
    point6: null,

  });

  page = new Page();

  constructor(
    private router: Router,
    private pageState: PageStateService,
    private formBuilder: FormBuilder,
    private infoService: StudentInfoService,
    private sv: GradeService,
    private loading: LoadingService,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private route: ActivatedRoute,
    private gradeService: GradeService,
    private studentinfoService: StudentInfoService,
    private gradeservice: GradeService,
    private subjectService: SubjectService,) { }

  ngOnInit(): void {


    this.pageState.getParams().id;
    this.id = this.pageState.getParams().id;

    console.log(this.id)
    this.search(this.id);
    this.searchSubject(true);

    this.route.snapshot.paramMap.get('gId');

    if (this.route.snapshot.paramMap.get('gId') != null) {
      this.label = "แก้ไขผลการเรียน"
      this.searchDetail(this.myID!);
    }else{
      this.label = "เพิ่มผลการเรียน"
    }

  }


  search(id: number): void {
    this.searchModel.id = id;
    this.infoService.search(this.searchModel).pipe(
      finalize(() => {
      }))
      .subscribe((res: any) => {
        Object.assign(this.InfoModel, res);
        console.log(this.InfoModel)
        this.gradSubmitForm.patchValue(res);
      });

  }

  searchSubject(flag: boolean): void {
    if (flag) {
      this.page = new Page();
    }
    this.loadingTable = true;
    Object.assign(this.searchModel, this.keyword);
    this.page.sorts = [{ colId: this.sortName || 'rowNum', sort: this.sortValue || 'asc' }];
    this.subjectService.list(this.subModel, this.page).pipe(
      finalize(() => {
      }))
      .subscribe((res: any) => {
        this.loadingTable = false;
        this.total = res.total;
        this.listOfSubject = res.records;
      },
        error => {
          this.notification.error('Error', error.error.message);
        });
  }


  // save() {
  //   //this.gradSubmitForm.controls.studentId = this.id;
  //   console.log(this.gradSubmitForm)
  // }

  save(): void {
    // let warning: number = 0;
    // if (this.gradSubmitForm.invalid) {
    //   for (const i in this.saveForm.controls) {
    //     this.gradSubmitForm.controls[i].markAsDirty();
    //     this.gradSubmitForm.controls[i].updateValueAndValidity();
    //   }
    //   this.notification.error('แจ้งเตือน', 'กรุณากรอกข้อมูลให้ครบถ้วน');
    //   warning++;
    // }
    // if (warning > 0) {
    //   return;
    // }
    this.gradSubmitForm.disable();
    this.modal.confirm({
      nzTitle: 'บันทึก',
      nzContent: 'ต้องการที่จะเพิ่มนักศึกษาคนนี้ใช่หรือไม่',
      nzOnOk: () => this.saveConfirm()
    });
  }
  saveConfirm() {
    Object.assign(this.saveModel, this.gradSubmitForm.getRawValue());
    this.gradeservice.save(this.saveModel).pipe(
      finalize(() => {
      }))
      .subscribe((res: any) => {
        if (res.success) {
          //this.searchDetail(res.result);
          this.notification.success('สำเร็จ', 'บันทึกสำเร็จแล้ว');
        }
      },
        error => {
          this.notification.error('Error', error.error.message);
        });
  }

  searchDetail(gId: number): void {
    this.searchGModel.gId = gId;
    this.sv.detail(this.searchGModel).pipe(
      finalize(() => {
        this.rebuildDetail();
      }))
      .subscribe((res: any) => {
        if (res !== {}) {
          this.gradSubmitForm.patchValue(res);
        }
      },
        error => {
          this.notification.error('Error', error.error.message);
        });
  }

  rebuildDetail() {
    this.detail = true;
    this.gradSubmitForm.markAsPristine();
    this.gradSubmitForm.enable();
  }



}
