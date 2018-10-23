import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../shared/articles.service'
import { CommunicationserviceService } from '../shared/communicationservice.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authorize: boolean;
  articles: Observable<Array<any>>;

  constructor(private articlesservice: ArticlesService,private communicationserviceService: CommunicationserviceService) { }

  ngOnInit() {
    if(localStorage.getItem('jwtToken') != null){
      this.authorize = true;
    }
    else{
      this.authorize = false;
    }
    this.global();
  }

  local(){

  }

  global(){
    this.articles = this.articlesservice.getArticels();
  }

  _loadArticle(data){
    this.communicationserviceService.updateArticleDetail(data);
  }
}
