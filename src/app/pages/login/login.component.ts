import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AppComponent } from 'src/app/app.component';
import { LoadingService } from 'src/app/core/loading/loading.service';
import { NgxSpinnerService } from "ngx-spinner";
import { canLoginModel, LoginModel, LoginService } from './login.service';
import { finalize } from 'rxjs/operators';
import { Page } from 'src/shared/interface/interface';
import { PageStateService } from 'src/app/service/page-state.service';
export interface login {
  studentId: any;
  idCard: any;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  keyword: string = '';
  page = new Page();
  listOfDataLogin: any;
  loadingTable = false;
  id: any;

  constructor(
    private fb: FormBuilder,
    private loading: LoadingService,
    private notification: NzNotificationService,
    private ac: AppComponent,
    private message: NzMessageService,
    private router: Router,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private spinner: NgxSpinnerService,
    private loginservice: LoginService,
    private pageState: PageStateService,

  ) { }
  loginForm!: FormGroup;
  isLoading = false;
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      studentId: [null, [Validators.required]],
      idCard: [null, [Validators.required]],
      remember: [true]
    });
  }
  loginModel: LoginModel = {} as LoginModel;
  canLoginModel: canLoginModel = {} as canLoginModel;
  sortName: string | null = null;
  sortValue: string | null = null;
  total = 1;
  loginId:number | undefined;

  // login(flag: boolean): void {
  //   this.spinner.show();
  //   this.isLoading = true;
  //   setTimeout(() => {
  //     //this.router.navigate(['/user'], { relativeTo: this.route });
  //     this.router.navigate(['/main/student'], { relativeTo: this.route });
  //     this.spinner.hide();
  //     this.notification.success('ล็อกอินสำเร็จ', 'ท่านได้ทำการเข้าสู่ระบบสำเร็จแล้ว');
  //   }, 1000);

  // }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//   login(): void {
//     let warning: number = 0;
//     if (this.loginForm.invalid) {
//       for (const i in this.loginForm.controls) {
//         this.loginForm.controls[i].markAsDirty();
//         this.loginForm.controls[i].updateValueAndValidity();
//       }
//       this.notification.error('ผิดพลาด', 'กรุณากรอกข้อมูลให้ครบถ้วน');
//       warning++;
//       if (warning > 0) {
//         return;
//       }
//     }


//   if (this.loginForm.controls.studentId.value == 'admin' && this.loginForm.controls.idCard.value == 'admin')
//   {
//     this.spinner.show();
//     this.isLoading = true;
//     setTimeout(() => {
//       this.router.navigate(['/main/student'], { relativeTo: this.route });
//       this.spinner.hide();
//     }, 1000);
//     this.router.navigate(['']);
//     setTimeout(() => {
//       this.message.success('คุณได้เข้าสู่ระบบในถานะ Admin');
//     }, 1000);

//   } else if (this.loginForm.controls.studentId.value == '11' && this.loginForm.controls.idCard.value == '11')
//   {
//     this.spinner.show();
//     this.isLoading = true;
//     setTimeout(() => {
//       this.router.navigate(['/user'], { relativeTo: this.route });
//       this.spinner.hide();
//     }, 1000);
//     this.router.navigate(['']);
//     setTimeout(() => {
//       this.message.success('คุณได้เข้าสู่ระบบในถานะ นักนักศึกษา');
//     }, 1000);

//   }

//   else {
//     this.notification.error('ผิดพลาด','ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
//     return
//   }

// }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

login(flag: boolean): void {
      let warning: number = 0;
    if (this.loginForm.invalid) {
      for (const i in this.loginForm.controls) {
        this.loginForm.controls[i].markAsDirty();
        this.loginForm.controls[i].updateValueAndValidity();
      }
      this.notification.error('ผิดพลาด', 'กรุณากรอกข้อมูลให้ครบถ้วน');
      warning++;
      if (warning > 0) {
        return;
      }
    }
  if (this.loginForm.controls.studentId.value == 'admin' && this.loginForm.controls.idCard.value == 'admin')
  {
    this.spinner.show();
    this.isLoading = true;
    setTimeout(() => {
      this.router.navigate(['/main/student'], { relativeTo: this.route });
      this.spinner.hide();
    }, 1000);
    setTimeout(() => {
      //this.message.success('คุณได้เข้าสู่ระบบในถานะ Admin');
      this.notification.success('Admin ล็อกอินสำเร็จ', 'ท่านได้ทำการเข้าสู่ระบบสำเร็จแล้ว');
    }, 1000)};

  if (flag) {
    this.keyword = this.loginForm.value;
    this.page = new Page();
  }
  this.loadingTable = true;
  Object.assign(this.loginModel, this.keyword);
  this.page.sorts = [{ colId: this.sortName || 'rowNum', sort: this.sortValue || 'asc' }];

  this.spinner.show();
  this.loginservice.login(this.loginModel, this.page).pipe(
    finalize(() => {
    }))
    .subscribe((res: any) => {
      this.loadingTable = false;
      this.total = res.total;
      this.listOfDataLogin = res.records;
      Object.assign(this.canLoginModel,res);

      let item1 = this.listOfDataLogin.find((i: { idCard: number; }) => i.idCard === this.loginForm.value.idCard);
      console.log(this.total)
      console.log(item1)
      this.loginId = item1.id
      console.log(item1.id)


      console.log("this is Login id"+this.loginId)
      if(this.total==1){

        this.isLoading = true;

        this.router.navigate(['/user'], { relativeTo: this.route });
        this.pageState.navigate(this.router, this.route, '/user', { id: this.loginId }, null);
        this.spinner.hide();
        this.notification.success('ล็อกอินสำเร็จ', 'ท่านได้ทำการเข้าสู่ระบบสำเร็จแล้ว');


  // }
      }else if(this.total==0 && this.loginForm.controls.studentId.value != 'admin' && this.loginForm.controls.idCard.value != 'admin')
      {
        this.notification.error('ล็อกไม่สำเร็จ', 'ชื่อผู้ใช้ หรือรหัสผ่านไม่ถูกต้อง!!');
      }
    },
      error => {
        this.notification.error('Error', error.error.message);
      });
}





}
