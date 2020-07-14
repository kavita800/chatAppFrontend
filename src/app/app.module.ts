import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { SocketService } from './services/socket.service';
import { CoreService } from './services/core.service';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UsersComponent } from './users/users.component';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { AuthGuard } from './guard/Auth.guard';
import { HeaderComponent } from './header/header.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { GroupComponent } from './group/group.component';
import { TimeagoModule } from 'ngx-timeago';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignUpComponent,
    UsersComponent,
    GroupChatComponent,
    GroupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    ToastrModule.forRoot(),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    TimeagoModule.forRoot()
  ],
  providers: [SocketService, CoreService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
