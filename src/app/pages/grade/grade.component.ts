import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractPageComponent } from 'src/app/abstract-page.component';
import { PageStateService } from 'src/app/service/page-state.service';
import { SearchModel, StudentInfoService } from '../student-info/student-info.service';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent extends AbstractPageComponent implements OnInit {

  dataSet = [
    {
      yearOfgrade: "1/2563",
      gps: 3.78,
      gpa: 3.78
    },
    {
      yearOfgrade: "2/2563",
      gps: 3.95,
      gpa: 3.86
    },
  ];


  id!: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pageState: PageStateService,
  ){
    super();
  }

  rout(id:any) {
    this.pageState.navigate(this.router, this.route, '/main/student/grade/detail', { id: id }, null);
   }

//   ngOnInit(): void {
//     this.id = this.route.snapshot.params['id'];
// console.log("grade"+this.id);
//   }
ngOnInit(): void {
  super.ngOnInit();
  // this.route.data.subscribe((data) => {
  //   this.id = data.id;
  //   this.pageState.getParams().id
  //   console.log(this.pageState.getParams().id)
  // });

  // addgrade() {
  //   this.router.navigate(['gradedetail',this.id]);
  // }
}}
