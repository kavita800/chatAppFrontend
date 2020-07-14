import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UsersComponent } from './users/users.component';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { AuthGuard } from './guard/Auth.guard';
import { GroupComponent } from './group/group.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'groupchat', component: GroupChatComponent, canActivate: [AuthGuard]},
  {path: 'groups', component: GroupComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
