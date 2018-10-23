import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommunicationserviceService } from '../shared/communicationservice.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {

  private logindata;
  value;
  private errors;
  constructor(private communicationserviceService: CommunicationserviceService) {
   }


  ngOnInit() {
    this.logindata = new FormGroup({
        email: new FormControl(""),
        pwd: new FormControl("")
     });

     this.communicationserviceService.getErrorSignIn().subscribe(errors => {
        this.errors = '* email or password ' + errors["email or password"];
     });
  }

  _loginIn(data){
    this.value = {
      email: data.email,
      password: data.pwd
    }
    this.communicationserviceService.updateSignInData(this.value);
  }

}
