import { Router, ActivatedRoute } from '@angular/router';
import { CoreService } from './../services/core.service';
import { SocketService } from './../services/socket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent implements OnInit {
  public obj: any = {};
  public email: any;
  public chatroom;
  public message: any;
  public groupInfo: any = [];
  messageArray: Array<{user: any, message: any}> = [];
  public isTyping: any;

  constructor(
    private route: ActivatedRoute,
    private socketService: SocketService,
    public coreService: CoreService,
    private router: Router
  ) {
    this.obj.groupName = this.route.snapshot.queryParamMap.get('groupName');
    this.obj.username = this.route.snapshot.queryParamMap.get('name');
    this.obj.email = this.route.snapshot.queryParamMap.get('email');
    this.socketService.getMessage().subscribe(data => {
      this.messageArray.push(data);
      console.log(data);
      this.isTyping = {};
    });
    this.socketService.getTyping().subscribe(bool => {
      if(bool) this.isTyping = bool;
    });
  }

  ngOnInit() {
    this.obj.currentUser = this.coreService.getUserInfo();
    if (this.obj.username && this.obj.email) {
      if ( this.obj.currentUser.username < this.obj.username) {
        this.chatroom = this.obj.currentUser.username.concat(this.obj.username);
      } else {
        this.chatroom = this.obj.username.concat(this.obj.currentUser.username);
      }
      // Connect to room using using current username and room id
      this.connectToSockets(this.chatroom);
    } else if (this.obj.groupName) {
      this.chatroom = this.obj.groupName;
      this.connectToSockets(this.obj.groupName);
    }
  }

  connectToSockets(chatRoom) {
    const userInfo = this.coreService.getUserInfo();
    this.socketService.connectRoom({user: userInfo.username, room: chatRoom});
    this.coreService.get('chat', chatRoom).subscribe(messages => {
      this.messageArray = messages.json();
    });

    this.coreService.get(`groupinfo/${chatRoom}`).subscribe(info => {
      this.groupInfo = info.json();
    });
  }
 // groupinfo
  sendMessage() {
    if(this.message.length > 0) {
      this.socketService.sendMessage({room: this.chatroom, user: this.obj.currentUser.username, message: this.message});
      this.message = '';
    }
  }

  typing(status) {
    this.socketService.isTyping({isTyping : status, room: this.chatroom, user: this.obj.currentUser.username});
  }

}
