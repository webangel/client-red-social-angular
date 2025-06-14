import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from './../../../../services/messages.service';
import { User } from '../../../../models/user';
import { UserService } from 'src/app/services/user.service';
import { Follow } from '../../../../models/follow';
import { FollowService } from 'src/app/services/follow.service';
import { Message } from './../../../../models/message';
import { GLOBAL } from '../../../../services/global';


@Component({
  selector: 'add',
  templateUrl: './add.component.html',
  providers: [FollowService, MessageService]
})

export class AddComponent implements OnInit{
  public title;
  public message: Message;
  public identity;
  public token;
  public url:string;
  public status: string;
  public follow:any;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _followService: FollowService,
    private messageService: MessageService,
    private _userService: UserService
  ){
      this.title = 'Enviar Mensaje';
      this.identity= this._userService.getIdentity();
      this.message = new Message('', '', '', '', this.identity._id , '');
      this.token=  this._userService.getToken();
      this.url=  GLOBAL.url;
      this.status = "";
  }
  ngOnInit(): void {
     console.log('add.component cargado!');
  }



}
