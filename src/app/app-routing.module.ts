import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { PageNotFound } from './PageNotFound/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { AmresultComponent } from './pages/amresult/amresult.component';
const routes: Routes = [

  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  //{ path: 'main',redirectTo: 'main/student',pathMatch: 'full'},
  {
    path: 'main', component: DefaultLayoutComponent, data: { title: 'Main' }, children:
      [{ path: '', loadChildren: () => import('./pages/student/student.module').then(m => m.StudentModule), },
      { path: 'subject', loadChildren: () => import('./pages/subject/subject.module').then(m => m.SubjectModule), },
      { path: 'grade', loadChildren: () => import('./pages/grade/grade.module').then(m => m.GradeModule) },
      { path: 'amresult', component: AmresultComponent },

    ]
  },
  { path: 'user', component: UserComponent },
  { path: '**', component: PageNotFound },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
