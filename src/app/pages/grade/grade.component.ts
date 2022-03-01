import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs/operators';
import { AbstractPageComponent } from 'src/app/abstract-page.component';
import { PageStateService } from 'src/app/service/page-state.service';
import { Page } from 'src/shared/interface/interface';
import { SearchModel, StudentInfoService } from '../student-info/student-info.service';
import { getDetailModel } from '../subject/subject.service';
import { GradeService, listModel, searchGrade2Model, searchGradeModel } from './grade.service';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent extends AbstractPageComponent implements OnInit {
  id:any
  searchGradeModel: searchGradeModel = {} as searchGradeModel;
  searchGrade2Model: searchGrade2Model = {} as searchGrade2Model;
  listModel: listModel = {} as listModel;
  getDetailModel: getDetailModel = {} as getDetailModel;


  listOfGrade: any = [];
  sortName: string | null = null;
  sortValue: string | null = null;
  keyword: string = '';
  page = new Page();
  loadingTable = false;
  total = 1;
  listOfData: any = [];
  scollTable: any;
  dataSet = [
    {
      yearOfgrade: "1/2563",
      gps: 3.78,
      gpa: 3.78
    },
    {
      yearOfgrade: "2/2563",
      gps: 3.95,
      gpa: 3.86
    },
  ];

  searchForm =  this.formBuilder.group({
    id: null,
  });

  // id!: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pageState: PageStateService,
    private gradeService: GradeService,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private formBuilder: FormBuilder,

  ){
    super();
  }


//   ngOnInit(): void {
//     this.id = this.route.snapshot.params['id'];
// console.log("grade"+this.id);
//   }
ngOnInit(): void {
  this.pageState.getParams().id;
  this.id = this.pageState.getParams().id;
  this.searchForm.value.id=(this.pageState.getParams().id);
  console.log(this.searchForm.value.id);
  this.searchGrade(true);
  super.ngOnInit();

  // this.route.data.subscribe((data) => {
  //   this.id = data.id;
  //   this.pageState.getParams().id
  //   console.log(this.pageState.getParams().id)
  // });

  // addgrade() {
  //   this.router.navigate(['gradedetail',this.id]);
  // }
  }

  rout() {
    this.id
    this.pageState.navigate(this.router, this.route, '/main/student/grade/detail', { id: this.id }, null);
   }


   searchGrade(flag: boolean): void {
    if (flag) {
      this.page = new Page();
      this.keyword = this.searchForm.value;
    }
    this.loadingTable = true;
    Object.assign(this.searchGradeModel, this.keyword);
    this.page.sorts = [{ colId: this.sortName || 'rowNum', sort: this.sortValue || 'asc' }];
    this.gradeService.searchGrade(this.searchGradeModel, this.page).pipe(
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



  edit(gId: number){
    this.router.navigate(['/main/student/grade/detail',{ gId: gId }]);
   // this.pageState.navigate(this.router, this.route, '/main/student/grade/detail', { gId: gId }, null);

  }


  cancel(gId: number) {
    this.modal.confirm({
     nzTitle: 'ลบ?',
     nzContent: '<b style="color: red;">ต้องการที่จะลบนักศึกษาคนนี้หรือไม่</b>',
     nzOkText: 'ลบ',
     nzOkType: 'primary',
     nzOkDanger: true,
     nzOnCancel: () => console.log('OK'),
     nzCancelText: 'ยกเลิก',
     nzOnOk: () => {
        this.getDetailModel.gId = gId;
       this.selectCancelPetition();}
     });
   }

   selectCancelPetition() {
    this.gradeService.cancel(this.getDetailModel).pipe(
      finalize(() => {
      }))
      .subscribe(() => {
        this.notification.success('สำเร็จ', 'ทำการลบนักศึกษาเรียบร้อยแล้ว');
        this.searchGrade(true);
      },
        error => {
          this.notification.error('Error', error.error.message);
        });
  }
}
