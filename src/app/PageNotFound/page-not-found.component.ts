import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageStateService } from '../service/page-state.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFound {




  constructor(
    private router: Router,
    private pageState: PageStateService,

  ){}

  ngOnInit() {
}

}




