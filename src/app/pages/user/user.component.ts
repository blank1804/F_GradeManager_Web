import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})



export class UserComponent implements OnInit {
  visible = false;
  listOfData = [
    {
      key: '1',
      id: '30000–1101',
      name: "ภาษาอังกฤษสําหรับการปฏิบัติงาน",
      credit: '3',
      grade: '4'
    },
    {
      key: '2',
      id: '30000–1502',
      name: "มนุษยสัมพันธ์ในการทํางาน",
      credit: '2',
      grade: '3.5'
    },
    {
      key: '3',
      id: '30900–0012',
      name: "การสร้างเว็บเบื้องต้น",
      credit: '2',
      grade: '4'
    },
    {
      key: '4',
      id: '30903–2001',
      name: "การออกแบบส่วนต่อประสานและประสบการณ์กับผู้ใช้",
      credit: '3',
      grade: '4'
    },
    {
      key: '5',
      id: '30903–2003',
      name: "การโปรแกรมเว็บส่วนแสดงผล ส่วนการจัดการและประมวณผล",
      credit: '3',
      grade: '4'
    },
    {
      key: '6',
      id: '3000–12001',
      name: "การออกแบบส่วนต่อประสานและประสบการณ์กับผู้ใช้",
      credit: '3',
      grade: '4'
    },
    {
      key: '7',
      id: '30903–2003',
      name: "การโปรแกรมเว็บส่วนแสดงผล ส่วนการจัดการและประมวลผล",
      credit: '3',
      grade: '4'
    },
    {
      key: '1',
      id: '30003–1401',
      name: "คณิตศาสตร์และสถิติเพื่องานอาชีพ",
      credit: '3',
      grade: '4'
    },
    {
      key: '1',
      id: '30003-1003',
      name: "การโปรแกรมเชิงวัตถุ",
      credit: '3',
      grade: '4'
    },
    {
      key: '1',
      id: '3000–1503',
      name: "การวิเคราะห์และออกแบบอัลกอริทึม",
      credit: '3',
      grade: '4'
    },

  ];


  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  constructor(
    private ac: AppComponent,
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    setTimeout(() => {
      // this.ac.loginin = 'P'
    }, 500);
}
}
