import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubjectComponent } from './subject.component';
import { SubjectDetailComponent } from './subject-detail.component';
const routes: Routes = [

  {
    path: '', component: SubjectComponent,
    data: { title: 'Subject', pageId: 'subject' },
    // canActivate: [AuthGuard],
  },
  {
    path: 'detail', component: SubjectDetailComponent,
    data: { title: 'Detail', pageId: 'detail' },
    // canActivate: [AuthGuard],
  },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
