import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AbstractPageComponent } from 'src/app/abstract-page.component';
import { Page } from 'src/shared/interface/interface';
import { GetDetail, SearchModel, StudentService } from './student.service';
import { RouterModule } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { LoadingService } from 'src/app/core/loading/loading.service';
import { StudentRoutingModule } from './student-routing.module';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { PageStateService } from 'src/app/service/page-state.service';
import { NgxSpinnerService } from 'ngx-spinner';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<SearchModel> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<SearchModel> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent extends AbstractPageComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private sv: StudentService,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private pageState: PageStateService,
    private notification: NzNotificationService,
    private studentServicev: StudentService,
    private loadingService: LoadingService,
    private router: Router,
    private loading:LoadingService,
    private spinner: NgxSpinnerService,

  ) {
    super();
  }
  isLoading = false;
  searchModel: SearchModel = {} as SearchModel;
  getDetail: GetDetail = {} as GetDetail;
  sortName: string | null = null;
  sortValue: string | null = null;
  keyword: string = '';
  page = new Page();
  loadingTable = false;
  total = 1;
  listOfData: any = [];
  scollTable: any;
  id: any;
  studentId: any;
  preName: any;
  firstName: any;
  lastName: any;
  fieldOfStudy:any;
  idCard: any;
  classYear: any;
  confirmModal?: NzModalRef;
  checked: any;

  searchForm = this.formBuilder.group({
    studentId: null,
    preName: null,
    firstName: null,
    lastName: null,
    fieldOfStudy: null,
    idCard: null,
    classYear: null
  });

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scollTable = super.scollTable();
    }, 10);
  }

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value === 'ascend' ? 'asc' : 'desc';
    this.search(false);
  }

  ngOnInit() {
    super.ngOnInit();
    this.route.data.subscribe((data) => {
      // this.year = data.student.year;
      // this.branch = data.student.branch;
    });
    this.search(true);
  }

  clear(flag: any): void {
    if (flag) {
      this.searchForm.reset();
      this.search(true);
    }
  }


  search(flag: boolean): void {
    if (flag) {
      this.keyword = this.searchForm.value;
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

  rout(id:any) {
    // this.router.navigate(['student/detail',id],);
    this.pageState.navigate(this.router, this.route, 'main/student/detail', { id: id }, null);
   }

  grade(id:any) {
    // this.router.navigate(['student/detail',id],);
    this.pageState.navigate(this.router, this.route, 'main/student/grade', { id: id }, null);
   }

  cancel(id: number) {
   this.modal.confirm({
    nzTitle: 'ลบ?',
    nzContent: '<b style="color: red;">ต้องการที่จะลบนักศึกษาคนนี้หรือไม่</b>',
    nzOkText: 'ลบ',
    nzOkType: 'primary',
    nzOkDanger: true,
    nzOnCancel: () => console.log('OK'),
    nzCancelText: 'ยกเลิก',
    nzOnOk: () => {

      this.getDetail.id = id;
      this.selectCancelPetition();
    }
    });
  }

  selectCancelPetition() {
    this.spinner.show();
    this.sv.cancel(this.getDetail).pipe(
      finalize(() => {
        this.spinner.hide();
      }))
      .subscribe(() => {
        this.notification.success('สำเร็จ', 'ทำการลบนักศึกษาเรียบร้อยแล้ว');
        this.search(true);
      },
        error => {
          this.notification.error('Error', error.error.message);
        });
  }

  // grade(id: number) {
  //   this.router.navigate(['student/grade', id]);
  // }

  listOfColumns: ColumnItem[] = [
    {
      name: 'รหัสนักศึกษา',
      sortOrder: null,
      sortFn: (a: SearchModel, b: SearchModel) => a.studentId.localeCompare(b.studentId),
      sortDirections: ['ascend', 'descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: false
    },
    {
      name: 'ชื่อ',
      sortOrder: null,
      sortFn: (a: SearchModel, b: SearchModel) => a.firstName.localeCompare(b.firstName),
      sortDirections: ['ascend', 'descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: false
    },
    {
      name: 'นามสกุล',
      sortOrder: null,
      sortFn: (a: SearchModel, b: SearchModel) => a.lastName.localeCompare(b.lastName),
      sortDirections: ['ascend', 'descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: false
    },
    {
      name: 'ชั้นปี',
      sortOrder: null,
      sortFn: (a: SearchModel, b: SearchModel) => a.classYear.localeCompare(b.classYear),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
        { text: 'ปวช.1', value: 'ปวช.1' },
        { text: 'ปวช.2', value: 'ปวช.2' },
        { text: 'ปวช.3', value: 'ปวช.3' },
        { text: 'ปวส.1', value: 'ปวส.1' },
        { text: 'ปวส.2', value: 'ปวส.2' },
      ],
      filterFn: (list: string[], item: SearchModel) => list.some(classYear => item.classYear.indexOf(classYear) !== -1)
    },
    {
      name: 'สาขา',
      sortOrder: null,
      sortFn: (a: SearchModel, b: SearchModel) => a.fieldOfStudy.localeCompare(b.fieldOfStudy),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
        { text: 'การบัญชี', value: 'การบัญชี' },
        { text: 'การตลาด', value: 'การตลาด' },
        { text: 'คอมพิวเตอร์กราฟิก', value: 'การตลาด' },
        { text: 'การโรงแรมและบริการ', value: 'การโรงแรมและบริการ' },
        { text: 'ธุรกิจร้านอาหารและภัตตาคาร', value: 'ธุรกิจร้านอาหารและภัตตาคาร' },
        { text: 'การจัดการธุรกิจค้าปลีก', value: 'การจัดการธุรกิจค้าปลีก' },
        { text: 'สปาและความงาม', value: 'สปาและความงาม' },
      ],
      filterFn: (list: string[], item: SearchModel) => list.some(fieldOfStudy => item.fieldOfStudy.indexOf(fieldOfStudy) !== -1)
    }
  ];
}



