import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { GetDetail, SaveModel, StudentService } from './student.service';
import { finalize } from 'rxjs/operators';
import { LoadingService } from 'src/app/core/loading/loading.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActivatedRoute } from '@angular/router';
import { AbstractPageComponent } from 'src/app/abstract-page.component';
import { PageStateService } from 'src/app/service/page-state.service';

@Component({
  selector: 'app-student',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent extends AbstractPageComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private sv: StudentService,
    private loading: LoadingService,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private route: ActivatedRoute,
    private pageState: PageStateService,
  ) {
    super();
  }

  isLoadingOne = false;
  saveModel: SaveModel = {} as SaveModel;
  getDetail: GetDetail = {} as GetDetail;
  detail = true;
  id: any = [];
  scollTable: any;
  label:any = [];

  saveForm = this.formBuilder.group({
    studentId: [null, [Validators.maxLength(10), Validators.required]],
    preName: [null, [Validators.required]],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    fieldOfStudy: [null],
    idCard: [null, [Validators.maxLength(13), Validators.required]],
    classYear: [null, [Validators.required]],
  });

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scollTable = super.scollTable();
    }, 10);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  // ngOnInit(): void {
  //   super.ngOnInit();
  //   this.id = this.route.snapshot.params['id'];
  //   console.log(this.id);
  //   if (this.id != null) {
  //     this.searchDetail(this.id);
  //   } else {
  //     this.detail = false;
  //   }
  // }

  ngOnInit(): void {
    super.ngOnInit();
    // this.route.data.subscribe((data) => {
    //   this.id = data.id;
    //   console.log(this.id);
    // });
    if (this.pageState.getParams() != null && this.pageState.getParams().id != null) {
      this.searchDetail(this.pageState.getParams().id);
      this.label = ["แก้ไขศึกษา","แก้ไขศึกษา","แก้","บันทึก"];
    } else {
      this.detail = false;
      this.label = ["เพิ่มนักศึกษา","เพิ่มนักศึกษา","เพิ่ม","เพิ่ม"];
    }
  }

  save(): void {
    let warning: number = 0;
    if (this.saveForm.invalid) {
      for (const i in this.saveForm.controls) {
        this.saveForm.controls[i].markAsDirty();
        this.saveForm.controls[i].updateValueAndValidity();
      }
      this.notification.error('แจ้งเตือน', 'กรุณากรอกข้อมูลให้ครบถ้วน');
      warning++;
    }
    if (warning > 0) {
      return;
    }
    this.saveForm.disable();
    this.modal.confirm({
      nzTitle: 'บันทึก',
      nzContent: 'ต้องการที่จะเพิ่มนักศึกษาคนนี้ใช่หรือไม่',
      nzOnOk: () => this.saveConfirm()
    });
    this.detail = true;
  }

  saveConfirm() {
    Object.assign(this.saveModel, this.saveForm.getRawValue());
    this.sv.save(this.saveModel).pipe(
      finalize(() => {
      }))
      .subscribe((res: any) => {
        if (res.success) {
          this.searchDetail(res.result);
          this.notification.success('สำเร็จ', 'บันทึกสำเร็จแล้ว');
        }
      },
        error => {
          this.notification.error('Error', error.error.message);
        });
  }

  searchDetail(id: number): void {
    this.getDetail.id = id;
    this.saveModel.id = id;
    this.sv.detail(this.getDetail).pipe(
      finalize(() => {
        this.rebuildDetail();
      }))
      .subscribe((res: any) => {
        if (res !== {}) {
          this.saveForm.patchValue(res);
        }
      },
        error => {
          this.notification.error('Error', error.error.message);
        });
  }

  rebuildDetail() {
    this.detail = true;
    this.saveForm.markAsPristine();
    this.saveForm.enable();
  }
}
