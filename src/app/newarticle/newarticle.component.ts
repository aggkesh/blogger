import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ArticlesService } from '../shared/articles.service';
import { CommunicationserviceService } from '../shared/communicationservice.service';

@Component({
  selector: 'app-newarticle',
  templateUrl: './newarticle.component.html',
  styleUrls: ['./newarticle.component.css']
})
export class NewarticleComponent implements OnInit {

  private articledata;
  errors: Array<string>;
  constructor(private articleservice: ArticlesService,private communicationserviceService: CommunicationserviceService) { }

  ngOnInit() {
    this.articledata = new FormGroup({
        articletitle: new FormControl(""),
        aboutarticle: new FormControl(""),
        articledetail: new FormControl(""),
        articletag: new FormControl("")
     });
     this.errors = [];
  }

  _addArticle(data){
    this.articleservice.addArticle(data).subscribe((article:any) => {
      this.communicationserviceService.updateArticleDetail(article.slug);
    },errors => {
      if(errors.status == 404){
        this.errors.push("Page Not Found");
      }
      else{
        let err = errors.error.errors;

        if(err != null && err.title != null){
          for(var index = 0;index < err.title.length;index++){
            this.errors.push("title field "+err.title[index]);
          }
        }
        if(err != null && err.description != null){
          for(var index = 0;index < err.description.length;index++){
            this.errors.push("description field "+err.description[index]);
          }
        }
        if(err != null && err.body != null){
          for(var index = 0;index < err.body.length;index++){
            this.errors.push("body field "+err.body[index]);
          }
        }
      }
    });
  }

}
