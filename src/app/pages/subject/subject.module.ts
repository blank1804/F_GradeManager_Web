import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectRoutingModule } from './subject-routing.module';
import { SubjectComponent } from './subject.component';
import { SubjectDetailComponent } from './subject-detail.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DemoNgZorroAntdModule } from 'src/app/ng-zorro-antd.module';

@NgModule({
  imports: [ SubjectRoutingModule,
            DemoNgZorroAntdModule,
            FormsModule,
            ReactiveFormsModule,
            CommonModule,],
  declarations: [ SubjectComponent,
    SubjectDetailComponent,


              ],
  exports: [ SubjectComponent]
})
export class  SubjectModule { }
