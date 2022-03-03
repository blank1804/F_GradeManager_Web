import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { GetDetail, SaveModel, SearchModel, SubjectService } from './subject.service';
import { finalize } from 'rxjs/operators';
import { LoadingService } from 'src/app/core/loading/loading.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Page } from 'src/shared/interface/interface';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { PageStateService } from 'src/app/service/page-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
interface DataItem {
  rowNum: number;
}
interface ColumnItem {
  name:string
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<DataItem> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<DataItem> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}
@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent  implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private sv: SubjectService,
    private loading: LoadingService,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private subjectService: SubjectService,
    private nzMessageService: NzMessageService,
    private pageState: PageStateService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,

  ) { }

  ngOnInit() {
     this.search(true);
  }

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
  getDetail: GetDetail = {} as GetDetail;
  subjectId:any;
  id:any;
  subjectName:any;
  subjectCredit:any;
  tabs = [1, 2, 3];

  searchForm = this.formBuilder.group({
    subjectId: null,
    subjectName: null,
  });


search(flag: boolean): void {
  if (flag) {
    this.keyword = this.searchForm.value;
    console.log(this.searchForm.value);
    this.page = new Page();
  }
  this.loadingTable = true;
  Object.assign(this.searchModel, this.keyword);
  this.page.sorts = [{ colId: this.sortName || 'rowNum', sort: this.sortValue || 'asc' }];
  this.subjectService.search(this.searchModel, this.page).pipe(
    finalize(() => {
    }))
    .subscribe((res: any) => {
      this.loadingTable = false;
      this.total = res.total;
      this.listOfData = res.records;
    },
      error => {
        this.notification.error('Error', error.error.message);
      });
}

clear(){
  this.searchForm.reset();
  this.search(true)
}
rout(sId: any) {
  this.pageState.navigate(this.router, this.route, 'main/subject/detail', { sId: sId }, null);
}

cancel(sId: number) {
  this.modal.confirm({
   nzTitle: 'ลบ?',
   nzContent: '<b style="color: red;">ต้องการที่จะลบวิชานี้หรือไม่</b>',
   nzOkText: 'ลบ',
   nzOkType: 'primary',
   nzOkDanger: true,
   nzOnCancel: () => console.log('OK'),
   nzCancelText: 'ยกเลิก',
   nzOnOk: () => {
     this.getDetail.sId = sId;
     this.selectCancelPetition();}
   });
 }

 selectCancelPetition() {
  this.spinner.show();
   this.sv.cancel(this.getDetail).pipe(
     finalize(() => {
      this.spinner.hide();
     }))
     .subscribe(() => {
       this.notification.success('สำเร็จ', 'ทำการลบวิชานี้เรียบร้อยแล้ว');
       this.search(true);
     },
       error => {
         this.notification.error('Error', error.error.message);
       });
 }

listOfColumns: ColumnItem[] = [
  {
    name: 'ลำดับ',
    sortOrder: null,
    sortFn: (a: DataItem, b: DataItem) => a.rowNum - b.rowNum,
    sortDirections: ['ascend', 'descend', null],
    listOfFilter: [],
    filterFn: null,
    filterMultiple: true
  }
];
}
