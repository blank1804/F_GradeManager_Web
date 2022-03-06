import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoadingService } from 'src/app/core/loading/loading.service';
import { PageStateService } from 'src/app/service/page-state.service';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {

  isCollapsed = false;
  constructor(
    private fb: FormBuilder,
    private loading: LoadingService,
    private notification: NzNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private pageState: PageStateService,
    private spinner: NgxSpinnerService,
  ) { }
  validateForm!: FormGroup;


  ngOnInit(): void {
    if((localStorage.getItem("role") !== "admin")){
      this.notification.error('ผิดพลาด', 'คุณไม่มีสิทธิเข้าถึงเนื้อหานี้ได้ กรุณาเข้าสู่ระบบใหม่อีกครั้ง');
      this.router.navigate(['/login'], { relativeTo: this.route });
    }
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
        localStorage.clear();
        this.spinner.hide();
        this.notification.success('ล็อกเอาท์สำเร็จ', 'ท่านได้ทำการออกจารระบบเรียบร้อยแล้ว');
      }, 1000); },
      nzCancelText: 'No',
      nzOnCancel: () => { console.log("ok") },
    });
  }

}
