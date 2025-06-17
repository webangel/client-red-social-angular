import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FollowService } from 'src/app/services/follow.service';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from '../../../../services/global';
import { Message } from './../../../../models/message';
import { MessageService } from './../../../../services/messages.service';


@Component({
  selector: 'received',
  styleUrls: ['./received.css'],
  templateUrl: './received.component.html',
   providers: [FollowService, MessageService]
})

export class ReceivedComponent implements OnInit{
  public title:string;
  public messages: Message[] = [];
  public identity;
  public token;
  public url:string;
  public follows:any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _followService: FollowService,
    private _messageService: MessageService,
    private _userService: UserService
  ){
    this.title = 'Mensajes recividos';
    this.identity= this._userService.getIdentity();
    this.token=  this._userService.getToken();
    this.url=  GLOBAL.url;
  }
  ngOnInit(): void {
     console.log('main.component cargado!');
     this.getMessage();
  }

  getMessage(){
    this._messageService.getMyMessages(this.token, 1).subscribe({
      next: response => {
        if(response.messages){
          console.log("response.messages", response.messages);
          this.messages = response.messages;
        }
      },
      error: err =>console.log(<any>err),
    });
  }
}


