import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FollowService } from 'src/app/services/follow.service';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from '../../../../services/global';
import { Message } from './../../../../models/message';
import { MessageService } from './../../../../services/messages.service';


@Component({
  selector: 'Añadir',
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
  public follows:any;
  public messageAlert = "";


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _followService: FollowService,
    private _messageService: MessageService,
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
     this.getMyFollows();
  }

  onSubmit(form: any){
    console.log(this.follows);
     this._messageService.addMessage(this.token, this.message).subscribe({
      next: response => {
        if(response.message){
          this.status = "success";
          this.messageAlert = "Has enviado el mensaje correctamente, miralo en "
          form.reset();
        }
      },
      error: err => {
        this.status = "danger";
        this.messageAlert = "No se ha podido enviar el mensaje correctamente. intentalo mas tarde!";
        console.log(<any>err);
      }
     });
  }

  getMyFollows(){
    this._followService.getMyFollows(this.token).subscribe({
      next: response  => this.follows = response.follows,
      error: err => console.log(<any>err),
    });
  }

}
