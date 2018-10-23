import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BannerComponent } from './banner/banner.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignOutComponent } from './sign-out/sign-out.component';

import {Routes, RouterModule} from '@angular/router';
import { BloggerComponent } from './blogger/blogger.component';
import { NewarticleComponent } from './newarticle/newarticle.component';

import { AutheticationService } from './shared/authetication.service';
import { CommunicationserviceService } from './shared/communicationservice.service'
import { ArticlesService } from './shared/articles.service'
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { ArticledetailComponent } from './articledetail/articledetail.component';
import { YourfeedComponent } from './yourfeed/yourfeed.component';
import { EditarticleComponent } from './editarticle/editarticle.component';

const routes: Routes = [
 {path: '', redirectTo: 'blogger', pathMatch: 'full'},
  {path: 'blogger', component: BloggerComponent , children: [
    {path: 'home', component: HomeComponent},
    {path: 'signIn', component: SignInComponent},
    {path: 'signUp', component: SignOutComponent},
    {path: 'newArticle', component: NewarticleComponent},
    {path: 'yourfeed/:username', component: YourfeedComponent},
    {path: 'article/:slug', component: ArticledetailComponent},
    {path: 'editarticle/:slug', component: EditarticleComponent}
  ]
}
];

@NgModule({
  declarations: [
    AppComponent,
    BloggerComponent,
    NavbarComponent,
    BannerComponent,
    HomeComponent,
    SignInComponent,
    SignOutComponent,
    NewarticleComponent,
    ArticledetailComponent,
    YourfeedComponent,
    EditarticleComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ AutheticationService,  CommunicationserviceService, ArticlesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
