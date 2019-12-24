import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { WebApiRequest } from '../interface/webapi-request.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { SystemApiRequest } from '../service/system-api-request.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit, OnDestroy {

  user_name: string;
  password: string;
  subscription = new Subscriber();
  isLogin = true;
  isCandidate = false;
  isCompany = false;
  candidateForm = new FormGroup({
    first_name: new FormControl(),
    last_name: new FormControl(),
    user_name: new FormControl(), // for company
    email_id: new FormControl(), // for company
    phone_no: new FormControl(), // for company
    admin_id: new FormControl(),
    company_name: new FormControl(), // for company
    password: new FormControl(), // for company
    repassword: new FormControl(), // for company
    login_type: new FormControl()
  });

  constructor(private routes: Router, private sAR: SystemApiRequest) { }

  ngOnInit() {
  }

  login() {
    if (this.user_name &&
      this.password) {
      this.subscription.add(this.sAR.getUserAuthenticate(this.user_name, this.password).subscribe((res: any) => {
        if (res && res.length > 0) {
          if (res[0].login_type === 'admin') {
            this.routes.navigate(['admin', `${JSON.stringify(res[0])}`]);
          } else {
            this.routes.navigate(['test', `${JSON.stringify(res[0])}`]);
          }
        } else {
          alert('Invalid credentials');
        }
      }));
    } else {
      alert('Please enter all the details');
    }
  }

  register(type) {
    if (type === 'candidate') {
      console.log(this.candidateForm);
      if (this.candidateForm.value && Object.keys(this.candidateForm.value).length > 0) {
        if (this.candidateForm.value.password !== this.candidateForm.value.repassword) {
          alert('Password miss-match');
        } else {
          this.subscription.add(this.sAR.saveNewLogin(this.candidateForm.value).subscribe(res => {
            if (res) {
              window.location.reload();
            }
          }));
        }
      }
    } else {
      // for company registration
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
