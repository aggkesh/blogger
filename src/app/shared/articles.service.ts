import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface IArticles
{
  articles : Array<string>
}

interface IArticle
{
  article : Object
}

interface IComments
{
  comments : Array<string>
}

interface IComment
{
    comment: Object
}

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient) { }

  getArticels(){
    return this.http.get<IArticles>("https://conduit.productionready.io/api/articles").map(response => response.articles);
  }

  addArticle(data){
    let article = {
      "article": {
        "title": data.articletitle,
        "description":  data.aboutarticle,
        "body": data.articledetail,
        "tagList": data.articletag.split(" ")
      }
    }

    let token: string;

    if(localStorage.getItem('jwtToken') != null){
        token = 'Token '+localStorage.getItem('jwtToken');
    }

    return this.http.post<IArticle>("https://conduit.productionready.io/api/articles",article,{
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token
              })
            }).map(response => response.article);
  }

  getArticle(articleslug){
    return this.http.get<IArticle>("https://conduit.productionready.io/api/articles/"+articleslug).map(response => response.article)
  }

  deleteArticle(articleslug){
    let token: string;

    if(localStorage.getItem('jwtToken') != null){
        token = 'Token '+localStorage.getItem('jwtToken');
    }

    return this.http.delete("https://conduit.productionready.io/api/articles/"+articleslug,{
              headers: new HttpHeaders({
                'Authorization': token
              })
            });
  }

  editArticle(data,slug){
    let article = {
      "article": {
        "title": data.articletitle,
        "description":  data.aboutarticle,
        "body": data.articledetail,
        "tagList": data.articletag.split(" ")
      }
    }

    let token: string;

    if(localStorage.getItem('jwtToken') != null){
        token = 'Token '+localStorage.getItem('jwtToken');
    }

    return this.http.put<IArticle>("https://conduit.productionready.io/api/articles/"+slug,article,{
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token
              })
            }).map(response => response.article);
  }

  getuserArticle(username){
    return this.http.get<IArticles>("https://conduit.productionready.io/api/articles/?author="+username).map(response => response.articles);
  }

  getComment(slug){
    return this.http.get<IComments>("https://conduit.productionready.io/api/articles/"+slug+"/comments").map(response => response.comments);
  }

  addComment(data,slug){
    let comment = {
                    "comment": {
                      "body": data.comment
                    }
                  }

    let token: string;

    if(localStorage.getItem('jwtToken') != null){
      token = 'Token '+localStorage.getItem('jwtToken');
    }

    return this.http.post<IComment>("https://conduit.productionready.io/api/articles/"+slug+"/comments",comment,{
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token
              })
            }).map(response => response.comment);
  }

  deleteComment(id,slug){
    let token: string;

    if(localStorage.getItem('jwtToken') != null){
        token = 'Token '+localStorage.getItem('jwtToken');
    }
    return this.http.delete("https://conduit.productionready.io/api/articles/"+slug+"/comments/"+id,{
              headers: new HttpHeaders({
                'Authorization': token
              })
            });
  }
}
