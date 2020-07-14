import { CoreService } from './../services/core.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  public Groups;
  public userData: any = {};
  constructor(public coreService: CoreService, private toastrService: ToastrService,
    ) { 
    this.userData = this.coreService.getUserInfo();
  }

  ngOnInit() {
    this.coreService.get(`groups/${this.userData.id}`).subscribe(users => {
      this.Groups = users.json();
    });
  }

}
