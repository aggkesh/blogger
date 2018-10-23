import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { UserType } from './user.type'

@Injectable({
  providedIn: 'root'
})
export class CommunicationserviceService {
  private dataLogOutObs$ = new Subject();
  private dataSignInObs$ = new Subject();
  private dataSignUpObs$ = new Subject();
  private dataArticleDetail$ = new Subject();
  private datanavigate$ = new Subject();
  private dataArticle$ = new Subject();
  private errorSignInObs$ = new Subject();
  private errorSignUpObs$ = new Subject();

  getSignInData() {
    return this.dataSignInObs$;
  }

  getSignUpData() {
    return this.dataSignUpObs$;
  }

  getLogOut(){
    return this.dataLogOutObs$;
  }

  getErrorSignIn(){
      return this.errorSignInObs$;
  }

  getErrorSignUp(){
      return this.errorSignUpObs$;
  }

  getArticleDetail(){
      return this.dataArticleDetail$;
  }

  getnavigate(){
      return this.datanavigate$;
  }

  getArticle(){
    return this.dataArticle$;
  }

  updateSignInData(data) {
    this.dataSignInObs$.next(data);
  }

  updateSignUpData(data){
    this.dataSignUpObs$.next(data);
  }

  updateLogOut(data){
    this.dataLogOutObs$.next(data);
  }

  updateArticleDetail(data){
    this.dataArticleDetail$.next(data);
  }

  updatenavigate(data){
    this.datanavigate$.next(data);
  }

  updateErrorSignIn(data){
    this.errorSignInObs$.next(data);
  }

  updateErrorSignUp(data){
    this.errorSignUpObs$.next(data);
  }

  updateArticle(data){
    this.dataArticle$.next(data);
  }
}
