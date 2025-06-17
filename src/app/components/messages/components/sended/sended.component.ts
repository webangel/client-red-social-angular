import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FollowService } from 'src/app/services/follow.service';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from '../../../../services/global';
import { Message } from './../../../../models/message';
import { MessageService } from './../../../../services/messages.service';

@Component({
  selector: 'sended',
  styleUrls: ['./sended.css'],
  templateUrl: './sended.component.html',
  providers: [FollowService, MessageService]
})

export class SendedComponent implements OnInit{
 public title:string;
  public messages: Message[] = [];
  public identity;
  public token;
  public url:string;
  public follows:any;
  public page: number =0;
  public next_page: number = 0;
  public prev_page: number = 0;
  public total: number = 0;
  public pages: number = 0;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _followService: FollowService,
    private _messageService: MessageService,
    private _userService: UserService
  ){
    this.title = 'Mensajes enviados';
    this.identity= this._userService.getIdentity();
    this.token=  this._userService.getToken();
    this.url=  GLOBAL.url;
  }
  ngOnInit(): void {
     console.log('main.component cargado!');
     this.actualPage();
  }
  actualPage(){
    this._route.params.subscribe(params =>{
      let page = +params['page'];
      this.page = Number(page);

      if(!params['page']){
        page = 1;
      }
      if(!page){
        page = 1;
      }else{
        this.next_page = page +1;
        this.prev_page = page -1;
        if(this.prev_page <=0){
          this.prev_page = 1;
          console.log("prev_page", this.prev_page);
        }
      }

      //devolver listado de usuarios
      this.getMessage(this.token, this.page);
    });
  }
    getMessage(token: any, page: number){
    this._messageService.getEmmitMyMessages(token, page).subscribe({
      next: response => {
        if(!response.messages){

        }else{
          console.log("response.messages", response.messages);
          this.messages = response.messages;
          this.total = response.total;
          this.pages = response.pages
        }
      },
      error: err =>console.log(<any>err),
    });
  }
}


