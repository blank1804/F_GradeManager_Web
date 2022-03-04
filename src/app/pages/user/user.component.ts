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
import { createPdf } from "pdfmake/build/pdfmake";

declare var require: any;
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { FormBuilder } from '@angular/forms';
import { Page } from 'src/shared/interface/interface';
import { GradeService, resultModel, searchGradeModel } from '../grade/grade.service';
const htmlToPdfmake = require("html-to-pdfmake");

const pdf = pdfMake;
pdf.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})




export class UserComponent implements OnInit {
  searchGradeModel: searchGradeModel = {} as searchGradeModel;
  resultModel: resultModel = {} as resultModel;
  searchModel: SearchModel = {} as SearchModel;
  InfoModel: InfoModel = {} as InfoModel;
  visible = false;
  listOfData: any = [];

  listOfGrade: any = [];
  sortName: string | null = null;
  gpa: number | null = null;
  sortValue: string | null = null;
  keyword: string = '';
  page = new Page();
  loadingTable = false;
  total = 1;
  scollTable: any;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }


  searchForm = this.formBuilder.group({
    id: null,
  });
  constructor(
    private ac: AppComponent,
    private router: Router,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private spinner: NgxSpinnerService,
    private pageState: PageStateService,
    private studentInfoService: StudentInfoService,
    private formBuilder: FormBuilder,
    private gradeService: GradeService,

  ) { }

  ngOnInit(): void {

    this.pageState.getParams().id;
    this.search(this.pageState.getParams().id)
    this.searchForm.value.id = (this.pageState.getParams().id);
    this.searchGrade(this.pageState.getParams().id);
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

  search(id: number): void {
    this.searchModel.id = id;
    this.studentInfoService.search(this.searchModel).pipe(
      finalize(() => {
      }))
      .subscribe((res: any) => {
        Object.assign(this.InfoModel, res);
      });

  }

  // @ViewChild('content', { static: false }) el!: ElementRef;

  // makePDF() {
  //   let pdf = new jsPDF('p', 'pt', 'a4');
  //   pdf.html(this.el.nativeElement, {
  //     callback: (pdf) => {
  //       pdf.save("demo.pdf");
  //     }
  //   });
  // }

  @ViewChild('content')
  pdfTable!: ElementRef;

  public downloadAsPDF() {

    const fonts = {
      THSarabunNew: {
        normal: 'THSarabunNew.ttf',
        bold: 'THSarabunNew Bold.ttf',
        italics: 'THSarabunNew Italic.ttf',
        bolditalics: 'THSarabunNew BoldItalic.ttf'
      }
    };

    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };

    //pdfMake.createPdf(documentDefinition).download();


    createPdf(documentDefinition, {}, {
      THSarabunNew: {
        normal: 'THSarabunNew.ttf',
        bold: 'THSarabunNew Bold.ttf',
        italics: 'THSarabunNew Italic.ttf',
        bolditalics: 'THSarabunNew BoldItalic.ttf'
      }
    }, pdfFonts.pdfMake.vfs).download();


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
        Object.assign(this.resultModel,res);
        this.math();
      },
        error => {
          this.notification.error('Error', error.error.message);
        });
  }

  math(){

    let data = this.listOfData.find((i: { id: number; }) => i.id === this.searchForm.value.id);
    let grade1 = data.point1;
    let grade2 = data.point2;
    let grade3 = data.point3;
    let grade4 = data.point4;
    let grade5 = data.point5;
    let grade6 = data.point6;

    let credit1 = data.subjectCredit1;
    let credit2 = data.subjectCredit2;
    let credit3 = data.subjectCredit3;
    let credit4 = data.subjectCredit4;
    let credit5 = data.subjectCredit5;
    let credit6 = data.subjectCredit6;

    let result1 = grade1 * credit1;
    let result2 = grade2 * credit2;
    let result3 = grade3 * credit3;
    let result4 = grade4 * credit4;
    let result5 = grade5 * credit5;
    let result6 = grade6 * credit6;

    let sumcredit = credit1 + credit2 + credit3 + credit4 + credit4 + credit5 + credit6;
    let sumresult = result1 + result2 + result3 + result4 + result4 + result5 + result6;

    let finalresult = sumresult / sumcredit;
    this.gpa = finalresult
  }


}
