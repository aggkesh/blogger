import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() loadPage = new EventEmitter<string>();
  @Input() authorize: any;
  @Input() username: any;
  constructor(){

  }

  ngOnInit(){

  }

  _loadPage(data: string){
    this.loadPage.emit(data);
  }
}
