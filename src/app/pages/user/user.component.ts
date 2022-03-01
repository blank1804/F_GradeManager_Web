import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from 'src/app/app.component';
import { jsPDF } from "jspdf";
import { PageStateService } from 'src/app/service/page-state.service';
import { InfoModel, SearchModel, StudentInfoService } from '../student-info/student-info.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})



export class UserComponent implements OnInit {

  searchModel: SearchModel = {} as SearchModel;
  InfoModel: InfoModel = {} as InfoModel;
  visible = false;
  listOfData = [
    {
      key: '1',
      id: '30000–1101',
      name: "ภาษาอังกฤษสําหรับการปฏิบัติงาน",
      credit: '3',
      grade: '4'
    },
    {
      key: '2',
      id: '30000–1502',
      name: "มนุษยสัมพันธ์ในการทํางาน",
      credit: '2',
      grade: '3.5'
    },
    {
      key: '3',
      id: '30900–0012',
      name: "การสร้างเว็บเบื้องต้น",
      credit: '2',
      grade: '4'
    },
    {
      key: '4',
      id: '30903–2001',
      name: "การออกแบบส่วนต่อประสานและประสบการณ์กับผู้ใช้",
      credit: '3',
      grade: '4'
    },
    {
      key: '5',
      id: '30903–2003',
      name: "การโปรแกรมเว็บส่วนแสดงผล ส่วนการจัดการและประมวณผล",
      credit: '3',
      grade: '4'
    },
    {
      key: '6',
      id: '3000–12001',
      name: "การออกแบบส่วนต่อประสานและประสบการณ์กับผู้ใช้",
      credit: '3',
      grade: '4'
    },
    {
      key: '7',
      id: '30903–2003',
      name: "การโปรแกรมเว็บส่วนแสดงผล ส่วนการจัดการและประมวลผล",
      credit: '3',
      grade: '4'
    },
    {
      key: '1',
      id: '30003–1401',
      name: "คณิตศาสตร์และสถิติเพื่องานอาชีพ",
      credit: '3',
      grade: '4'
    },
    {
      key: '1',
      id: '30003-1003',
      name: "การโปรแกรมเชิงวัตถุ",
      credit: '3',
      grade: '4'
    },
    {
      key: '1',
      id: '3000–1503',
      name: "การวิเคราะห์และออกแบบอัลกอริทึม",
      credit: '3',
      grade: '4'
    },

  ];


  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  constructor(
    private ac: AppComponent,
    private router: Router,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private spinner: NgxSpinnerService,
    private pageState: PageStateService,
    private studentInfoService: StudentInfoService,

  ) { }

  ngOnInit(): void {

    this.pageState.getParams().id;
    this.search(this.pageState.getParams().id)
  }

  logout(): void {
    this.modal.confirm({
      nzTitle: '<i>ออกจากระบบ</i>',
      nzContent: '<b>ต้องการที่จะออกจากระบบหรือไม่?</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.spinner.show();
        setTimeout(() => {
          this.router.navigate(['/login'], { relativeTo: this.route });
          this.spinner.hide();
          this.notification.success('ล็อกเอาท์สำเร็จ', 'ท่านได้ทำการออกจารระบบเรียบร้อยแล้ว');
        }, 1000);
      },
      nzCancelText: 'No',
      nzOnCancel: () => { console.log("ok") },
    });
  }

  search(id:number): void {
    this.searchModel.id = id;
    this.studentInfoService.search(this.searchModel).pipe(
      finalize(() => {
      }))
      .subscribe((res: any) => {
        Object.assign(this.InfoModel,res);
      });

  }

  @ViewChild('content', { static: false }) el!: ElementRef;

  makePDF() {

    let pdf = new jsPDF('p','pt','a4');
    pdf.html(this.el.nativeElement, {
      callback: (pdf)=> {
        pdf.save ("demo.pdf");
      }
     });


  }


}
