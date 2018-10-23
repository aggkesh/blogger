import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../shared/articles.service';
import { AutheticationService } from '../shared/authetication.service';
import { ActivatedRoute} from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { CommunicationserviceService } from '../shared/communicationservice.service';

@Component({
  selector: 'app-articledetail',
  templateUrl: './articledetail.component.html',
  styleUrls: ['./articledetail.component.css']
})
export class ArticledetailComponent implements OnInit {

  article:any;
  private commentdata;
  userarticle:any;
  usercomments:any;
  slug:any;
  error:any;

  constructor(private articleservice: ArticlesService,private activatedroute: ActivatedRoute,
    private authetication: AutheticationService,private communicationserviceService: CommunicationserviceService) { }

  ngOnInit() {
    this.slug = this.activatedroute.snapshot.params.slug;

    this.commentdata = new FormGroup({
        comment: new FormControl(""),
     });

    this.articleservice.getArticle(this.slug).subscribe((article:any) => {
      this.article = article;
      this.authetication._getCurrentUser().subscribe((data:any) => {
        if(article.author.username === data.username){
            this.userarticle = true;
        }
        else{
            this.userarticle = false;
        }
      });
    });
    this._getComment();
  }

  _deleteArticle(){
    this.articleservice.deleteArticle(this.slug).subscribe((success) => {
        this.communicationserviceService.updatenavigate('home');
    });
  }

  _editArticle(){
    this.communicationserviceService.updatenavigate('editarticle/'+this.slug);
  }

  _getComment(){
    this.articleservice.getComment(this.slug).subscribe((comments:any) =>{
      this.usercomments = comments;
    });
  }

  _addComment(data){
    this.articleservice.addComment(data,this.slug).subscribe((data:any) =>{
        this._getComment();
        this.commentdata.setValue({comment: ""});
    },errors =>{
      this.error = "Comment Field "+errors.error.errors.body;
    });
  }

  _deleteComment(id){
    this.articleservice.deleteComment(id,this.slug).subscribe((data:any) =>{
        this._getComment();
    },errors =>{
        this.error = "Comment "+ errors.error.errors.comment;
    });
  }
}
