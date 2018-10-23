import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../shared/articles.service';
import { CommunicationserviceService } from '../shared/communicationservice.service';
import { ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-yourfeed',
  templateUrl: './yourfeed.component.html',
  styleUrls: ['./yourfeed.component.css']
})
export class YourfeedComponent implements OnInit {
  articles:Observable<Array<any>>;
  username:any;

  constructor(private articleservice: ArticlesService,private communicationserviceService: CommunicationserviceService
  ,private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.username = this.activatedroute.snapshot.params.username;
    this._myArticles();
  }

  _myArticles(){
      this.articles = this.articleservice.getuserArticle(this.username);
  }

  _loadArticle(data){
    this.communicationserviceService.updateArticleDetail(data);
  }
}
