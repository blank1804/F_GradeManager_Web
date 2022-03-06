import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student.component';
import { StudentDetailComponent } from './student-detail.component';

const routes: Routes = [
  {
    path: 'student', component: StudentComponent,
    data: { title: 'Student', pageId: 'student' },
  },
  {
    path: 'student/detail', component: StudentDetailComponent,
    data: { title: 'Detail', pageId: 'detail' },
  },
  { path: 'student/grade', loadChildren: () => import('../grade/grade.module').then(m => m.GradeModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
