import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GradeComponent } from './grade.component';
import { GradeDetailComponent } from './grade-detail.component';
const routes: Routes = [
  { path: '', component: GradeComponent, },
  { path: 'detail', component: GradeDetailComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GradeRoutingModule { }
