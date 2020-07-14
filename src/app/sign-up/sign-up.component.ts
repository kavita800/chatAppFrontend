import { Router } from '@angular/router';
import { CoreService } from './../services/core.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public signForm: FormGroup;
  public isSubmit: any = false;
  constructor(
    private coreService: CoreService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.signForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      cfpassword: ['', [Validators.required]]
    }, {validator: this.pwdMatchValidator});
  }

  pwdMatchValidator(frm: FormGroup) {
    return frm.get('password').value === frm.get('cfpassword').value
       ? null : {mismatch: true};
  }
 
   // convenience getter for easy access to form fields
   get get() { return this.signForm.controls; }

  submitForm() {
    this.isSubmit = true;
    if(this.signForm.invalid) return false;
    const user = {
      username: this.signForm.value.username,
      email: this.signForm.value.email,
      password: this.signForm.value.password,
    };
    this.coreService.post('signup', user).subscribe(response => {
      if (response.json().user_already_signed_up === true) {
        this.toastrService.error('Username already taken.');
      } else {
        this.toastrService.success('Successfully signed up. You can now login');
        this.router.navigate(['/']);
      }
    });
  }
}
