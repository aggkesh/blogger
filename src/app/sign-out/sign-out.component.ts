import { Component, OnInit } from '@angular/core';
import { CommunicationserviceService } from '../shared/communicationservice.service';
import { FormGroup, FormControl } from '@angular/forms';
import { UserType } from '../shared/user.type';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent implements OnInit {

  private registerdata;
  value;
  errors: Array<string>;
  constructor(private communicationserviceService: CommunicationserviceService) { }

  ngOnInit() {
    this.errors = [];
    this.registerdata = new FormGroup({
        username: new FormControl(""),
        email: new FormControl(""),
        pwd: new FormControl("")
     });

     this.communicationserviceService.getErrorSignUp().subscribe((errors:any) => {
      console.log(errors);
      for(var index = 0;index < errors.username.length;index++){
        this.errors.push("username field "+errors.username[index]);
      }
      for(var index = 0;index < errors.email.length;index++){
        this.errors.push("email field "+errors.username[index]);
      }
      for(var index = 0;index < errors.password.length;index++){
        this.errors.push("password field "+errors.username[index]);
      }
     });
  }

  _register(data){
    this.value = {
      username: data.username,
      email: data.email,
      password: data.pwd
    }
    this.communicationserviceService.updateSignUpData(this.value);
  }
}
