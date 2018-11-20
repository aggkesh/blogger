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
    return this.http.get<IArticles>("http://localhost:3000/api/articles").map(response => response.articles);
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

    return this.http.post<IArticle>("http://localhost:3000/api/articles",article,{
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token
              })
            }).map(response => response.article);
  }

  getArticle(articleslug){
    return this.http.get<IArticle>("http://localhost:3000/api/articles/"+articleslug).map(response => response.article)
  }

  deleteArticle(articleslug){
    let token: string;

    if(localStorage.getItem('jwtToken') != null){
        token = 'Token '+localStorage.getItem('jwtToken');
    }

    return this.http.delete("http://localhost:3000/api/articles/"+articleslug,{
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

    return this.http.put<IArticle>("http://localhost:3000/api/articles/"+slug,article,{
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token
              })
            }).map(response => response.article);
  }

  getuserArticle(username){
    return this.http.get<IArticles>("http://localhost:3000/api/articles/?author="+username).map(response => response.articles);
  }

  getComment(slug){
    return this.http.get<IComments>("http://localhost:3000/api/articles/"+slug+"/comments").map(response => response.comments);
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

    return this.http.post<IComment>("http://localhost:3000/api/articles/"+slug+"/comments",comment,{
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
    return this.http.delete("http://localhost:3000/api/articles/"+slug+"/comments/"+id,{
              headers: new HttpHeaders({
                'Authorization': token
              })
            });
  }
}
