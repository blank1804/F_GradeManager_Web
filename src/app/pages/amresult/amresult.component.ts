import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs/operators';
import { Page } from 'src/shared/interface/interface';
import { GradeService, saveModel } from '../grade/grade.service';
import { SearchModel, StudentService } from '../student/student.service';
import { sbSearchModel, SubjectService } from '../subject/subject.service';

@Component({
  selector: 'app-amresult',
  templateUrl: './amresult.component.html',
  styleUrls: ['./amresult.component.css']
})
export class AmresultComponent implements OnInit {
  isLoadingOne = false;
  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private subjectService: SubjectService,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private gradeservice: GradeService,


  ) { }

  keyword: string = '';
  page = new Page();
  loadingTable = false;
  total = 1;
  listOfData: any = [];
  listOfSubject: any = [];
  listOfName = [];
  searchModel: SearchModel = {} as SearchModel;
  subModel: sbSearchModel = {} as sbSearchModel;
  saveModel: saveModel = {} as saveModel;

  sortName: string | null = null;
  sortValue: string | null = null;

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
  searchSubmitForm = this.formBuilder.group({
    classYear: null,
    fieldOfStudy: null,
  });
  ngOnInit(): void {
    this.searchSTD(true)
    this.searchSB(true)

  }

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value === 'ascend' ? 'asc' : 'desc';
    this.searchSTD(false);
  }

  searchSTD(flag: boolean): void {
    if (flag) {
      this.keyword = this.searchSubmitForm.value;
      this.page = new Page();
    }
    this.loadingTable = true;
    Object.assign(this.searchModel, this.keyword);
    this.page.sorts = [{ colId: this.sortName || 'rowNum', sort: this.sortValue || 'asc' }];
    this.studentService.search(this.searchModel, this.page).pipe(
      finalize(() => {
      }))
      .subscribe((res: any) => {
        this.loadingTable = false;
        this.total = res.total;
        this.listOfData = res.records;
        console.log(this.listOfData)
      },
        error => {
          this.notification.error('Error', error.error.message);
        });
  }


reset(){
this.searchSubmitForm.reset();
}
reset1(){
this.gradSubmitForm.reset();
}

searchSB (flag: boolean): void {
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

save(): void {
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




}
