import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ArticlesService } from '../shared/articles.service';
import { ActivatedRoute} from '@angular/router';
import { AutheticationService } from '../shared/authetication.service';
import { CommunicationserviceService } from '../shared/communicationservice.service';

@Component({
  selector: 'app-editarticle',
  templateUrl: './editarticle.component.html',
  styleUrls: ['./editarticle.component.css']
})
export class EditarticleComponent implements OnInit {

  private editarticledata;
  errors: Array<string>;
  pagenotfound: any;
  slug:any;

  constructor(private articleservice: ArticlesService,private communicationserviceService: CommunicationserviceService
    ,private authetication: AutheticationService,private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.slug = this.activatedroute.snapshot.params.slug;
    this.errors = [];

      this.editarticledata = new FormGroup({
          articletitle: new FormControl(),
          aboutarticle: new FormControl(),
          articledetail: new FormControl(),
          articletag: new FormControl()
       });

      this.authetication._getCurrentUser().subscribe((data:any) => {
          this.articleservice.getArticle(this.slug).subscribe((article:any) => {
        if(article.author.username === data.username){
            this.editarticledata.setValue({
                    articletitle: article.title,
                    aboutarticle: article.description,
                    articledetail: article.body,
                    articletag: ""});
        }
        else{
          this.communicationserviceService.updatenavigate('home');
        }
      });
    });
  }

  _editArticle(data){
    this.articleservice.editArticle(data,this.slug).subscribe((article:any) => {
      this.communicationserviceService.updateArticleDetail(article.slug);
    },(errors) => {
      if(errors.status == 404){
        this.pagenotfound = errors.error;
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
