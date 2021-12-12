import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradeRoutingModule } from './grade-routing.module';
import { GradeComponent } from './grade.component';
import { GradeDetailComponent } from './grade-detail.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DemoNgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { StudentInfoComponent } from '../student-info/student-info.component';

@NgModule({
  imports: [ GradeRoutingModule,
            DemoNgZorroAntdModule,
            FormsModule,
            ReactiveFormsModule,
            CommonModule,],
  declarations: [ GradeComponent,
                  GradeDetailComponent,
                  StudentInfoComponent


              ],
  exports: [ GradeComponent]
})
export class  GradeModule { }
