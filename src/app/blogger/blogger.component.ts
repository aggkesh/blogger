import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { AutheticationService } from '../shared/authetication.service';
import { CommunicationserviceService } from '../shared/communicationservice.service';
import { UserType } from '../shared/user.type';

@Component({
  selector: 'app-blogger',
  templateUrl: './blogger.component.html',
  styleUrls: ['./blogger.component.css']
})

export class BloggerComponent implements OnInit {
  authorize:any;
  username:any;
  constructor(private router: ActivatedRoute,private route: Router,private authetication: AutheticationService
              ,private communicationserviceService: CommunicationserviceService) {
  }

  ngOnInit() {
      this.authorize = false;

      this.route.navigate(['home'], { relativeTo: this.router});

      this.communicationserviceService.getSignInData().subscribe((data) => {
        this.authetication._login(data).
            subscribe((userdata:any) => {
              localStorage.setItem('jwtToken',userdata.token);
              this.authorize = true;
              this.username = userdata.username;
              this.route.navigate(['home'], { relativeTo: this.router});
          },error => {
            this.communicationserviceService.updateErrorSignIn(error.error.errors);
          });
      });

      this.communicationserviceService.getSignUpData().subscribe((data) => {
        this.authetication._register(data).subscribe((data) =>{
          this.route.navigate(['signIn'], { relativeTo: this.router});
        },error => {
          this.communicationserviceService.updateErrorSignUp(error.error.errors);
        });
      });

      this.communicationserviceService.getArticleDetail().subscribe((data) => {
          this.route.navigate(['article/'+data], { relativeTo: this.router});
      });

      this.communicationserviceService.getnavigate().subscribe((data) => {
          this.route.navigate([data], { relativeTo: this.router});
      });
  }

  pageLoad(data){
    if(data === 'logOut'){
      localStorage.removeItem('jwtToken');
      this.authorize = false;
      this.route.navigate(['home'], { relativeTo: this.router});
    }
    else if(data == 'yourfeed'){
      this.route.navigate([data+"/"+this.username], { relativeTo: this.router});
    }
    else{
      this.route.navigate([data], { relativeTo: this.router});
    }
  }
}
