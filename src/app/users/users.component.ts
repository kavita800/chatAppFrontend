import { CoreService } from './../services/core.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public Users;
  public groupName: any = '';
  public UsersObj: any = {};
  public userData: any = [];
  constructor(
    private router: Router,
    public coreService: CoreService, 
    private toastrService: ToastrService,
    ) { 
    this.UsersObj = this.coreService.getUserInfo();
  }

  ngOnInit() {
    this.coreService.get('users').subscribe(users => {
      this.Users = users.json();
    });
  }

  selectUsers(id) {
    if(!id) return;
    const index = this.userData.findIndex((x: any) => x === id);
    if(index === -1) {
      this.userData.push(id);
    } else {
      this.userData.splice(index, 1);
    }
  }

  createGroup() {
    if (this.groupName.length === 0) {
      this.toastrService.error('Group name is required.');
      return false;
    }
    if (this.userData.length === 0) {
      this.toastrService.error('Please select atleast one members to create group');
      return false;
    }
    this.userData.push(this.UsersObj.id);
    this.coreService.post('createroom', {userId:this.UsersObj.id, name : this.groupName, members: this.userData}).subscribe(response => {
      if (response.json().group_exits === true) {
        this.toastrService.error('Group name already exits.');
        this.groupName = '';
        this.userData = [];
        this.router.navigate(['/groups']);
      } else {
        this.toastrService.success('Group created successfully.');
        this.groupName = '';
        this.userData = [];
        this.router.navigate(['/groups']);
      }
    });
  }
}
