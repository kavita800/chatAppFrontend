import { Router } from '@angular/router';
import { CoreService } from './../services/core.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isCollapsed : boolean = false;
  public userObj: any = {};
  constructor(
    public coreService: CoreService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userObj.access = this.coreService.isUserIn(); 
    this.userObj.userData = this.coreService.getUserInfo();
  }

  onLogoutClick() {
    localStorage.removeItem('user');
    this.toastrService.success('Successfully logged-out');
    this.router.navigate(['/']);
  }

}
