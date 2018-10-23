import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { UserType } from './user.type';
import { map } from 'rxjs/operators';

interface IUser
{
  user : Object
}

@Injectable({
  providedIn: 'root'
})
export class AutheticationService {
  // private user: User;
  private user: Object;
  constructor(private http: HttpClient) {
  }

  _login(data){
    this.user = {
                "user": {
                  "email": data.email,
                  "password": data.password
                }
              };

    return this.http.post<IUser>("https://conduit.productionready.io/api/users/login",this.user, {
              headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
            }).map(res => res.user);
  }

  _register(data){
    this.user = {
                "user": {
                  "username": data.username,
                  "email": data.email,
                  "password": data.password
                }
              };
    return this.http.post<IUser>("https://conduit.productionready.io/api/users",this.user, {
              headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
            }).map(res => res.user);
  }

  _getCurrentUser(){
    let token: string;

    if(localStorage.getItem('jwtToken') != null){
        token = 'Token '+localStorage.getItem('jwtToken');
    }

    return this.http.get<IUser>("https://conduit.productionready.io/api/user",{
      headers: new HttpHeaders({
        'Authorization': token
      })
    }).map((response) => response.user);
  }

}
