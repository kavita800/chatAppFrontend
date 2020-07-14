import { Router } from '@angular/router';
import { CoreService } from './../services/core.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormArray, Validators, ValidatorFn } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public isSubmit: any = false;
  public userObj: any = {};
  constructor(
    public coreService: CoreService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    ) {
      if (this.coreService.isUserIn()) {
        this.router.navigate(['/users']);
      }
    }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.userObj.access = this.coreService.isUserIn();  
  }

  login() {
    this.isSubmit = true;
    if(this.loginForm.invalid) return;
    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.coreService.post('signin', user).subscribe(response => {
      const res = response.json();
      if (res.isPresent === true) {
        if ( res.correctPassword === true ) {
          localStorage.setItem('user', JSON.stringify(res.user));
          this.toastrService.success('Successfully logged in');
          this.router.navigate(['/users']);
        } else {
          this.toastrService.error('Incorrect Password');
        }
      } else {
        this.toastrService.error('Invaild Email and password.');
      }
    });
  }

   // convenience getter for easy access to form fields
   get get() { return this.loginForm.controls; }

   logout() {
    localStorage.removeItem('user');
    this.toastrService.success('Successfully logged-out');
    this.router.navigate(['/']);
  }

}
