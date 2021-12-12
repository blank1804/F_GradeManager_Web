import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-amresult',
  templateUrl: './amresult.component.html',
  styleUrls: ['./amresult.component.css']
})
export class AmresultComponent implements OnInit {
  isLoadingOne = false;
  constructor(
    private formBuilder: FormBuilder,
  ) { }
  gradSubmitForm = this.formBuilder.group({
    stdId: null,
    stdId2: null,
    stdId3: null,
    stdId4: null,
    stdId5: null,
    stdId6: null,
    stdId7: null,

  });
  ngOnInit(): void {

  }

}
