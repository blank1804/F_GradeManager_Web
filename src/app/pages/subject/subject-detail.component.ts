import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs/operators';
import { AbstractPageComponent } from 'src/app/abstract-page.component';
import { LoadingService } from 'src/app/core/loading/loading.service';
import { PageStateService } from 'src/app/service/page-state.service';
import { Page } from 'src/shared/interface/interface';
import { SearchModel, SaveModel, SubjectService, GetDetail } from './subject.service';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.css']
})
export class SubjectDetailComponent extends AbstractPageComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private sv: SubjectService,
    private loading: LoadingService,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private subjectService: SubjectService,
    private nzMessageService: NzMessageService,
    private pageState: PageStateService,
  ) {super(); }

  saveForm = this.formBuilder.group({
    subjectId: [null, [Validators.maxLength(10),Validators.required]],
    subjectName: [null, [Validators.required]],
    subjectCredit: [null, [Validators.max(9), Validators.required]],
  });
  saveModel: SaveModel = {} as SaveModel;
  getDetail: GetDetail = {} as GetDetail;
  isLoadingOne = false;
  detail = true;
  sortName: string | null = null;
  sortValue: string | null = null;
  keyword: string = '';
  page = new Page();
  loadingTable = false;
  total = 1;
  listOfData: any = [];
  searchModel: SearchModel = {} as SearchModel;
  scollTable: any;
  SaveModel: SaveModel = {} as SaveModel;
  label:any = [];

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scollTable = super.scollTable();
    }, 10);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  ngOnInit(): void {
    super.ngOnInit();
    // this.route.data.subscribe((data) => {
    //   this.id = data.id;
    //   console.log(this.id);
    // });
    if (this.pageState.getParams() != null && this.pageState.getParams().sId != null) {
      this.searchDetail(this.pageState.getParams().sId);
      this.label = ["แก้ไขวิชา","แก้ไขวิชา","แก้ไข","แก้ไข"];
    } else {
      this.detail = false;
      this.label = ["เพิ่มวิชา","เพิ่มวิชา","เพิ่ม","เพิ่ม"];
    }
  }

  searchDetail(sId: number): void {
    this.getDetail.sId = sId;
    this.saveModel.sId = sId;
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

  clear(){
    this.saveForm.reset();
  }
}
