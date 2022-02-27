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
  listOfData: any;

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

  // submitForm(): void {
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

//   submitForm(): void {
//     let warning: number = 0;
//     if (this.validateForm.invalid) {
//       for (const i in this.validateForm.controls) {
//         this.validateForm.controls[i].markAsDirty();
//         this.validateForm.controls[i].updateValueAndValidity();
//       }
//       this.notification.error('ผิดพลาด', 'กรุณากรอกข้อมูลให้ครบถ้วน');
//       warning++;
//       if (warning > 0) {
//         return;
//       }
//     }


//   if (this.validateForm.controls.userName.value == 'admin' && this.validateForm.controls.password.value == 'admin')
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

//   } else if (this.validateForm.controls.userName.value == '11' && this.validateForm.controls.password.value == '11')
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

login(): void {
  Object.assign(this.loginModel, this.loginForm.getRawValue());  this.loginservice.login(this.loginModel).pipe(
    finalize(() => {
    }))
    .subscribe((res: any) => {
      Object.assign(this.canLoginModel,res);
      console.log(this.canLoginModel)
    });

}





}
