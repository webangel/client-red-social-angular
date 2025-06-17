import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FollowService } from 'src/app/services/follow.service';
import { SharedService } from 'src/app/services/shared.service';
import { Follow } from '../../models/follow';
import { User } from '../../models/user';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  providers: [UserService, FollowService],
  styleUrls: ['./users.css'],
})

export class UsersComponent implements OnInit{
  public title: string;
  public identity: any;
  public token: any;
  public page: any;
  public next_page: any;
  public prev_page: any;
  public total: any;
  public pages: any;
  public users: User[] | any;
  public status: any;
  public follows: any;
  public url: string;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _followService: FollowService,
    private _sharedService: SharedService
  ){
    this.title = 'Gente';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;

  }
  ngOnInit(): void {
    console.log("users.component ha sido cargado");
    this.actualPage();
  }

  enviarDato(id: any) {
    this._sharedService.sendMessage({ id: id });
  }

  actualPage(){
    this._route.params.subscribe(params =>{
      let page = +params['page'];
      this.page = page;

      if(!params['page']){
        page = 1;
      }

      if(!page){
        page = 1;
      }else{
        this.next_page = page + 1;
        this.prev_page = page - 1;
        if(this.prev_page <=0){
          this.prev_page = 1;
        }
      }

      //devolver listado de usuarios
      this.getUsers(page);
    });
  }

  getUsers(page: any){
    this._userService.getUsers(page).subscribe(
      response => {
        if(!response.users){
          this.status = 'error';
        }else{
          this.total = response.total;
          this.users = response.users;
          this.pages = response.pages;
          this.follows = response.users_following;
          console.log(this.follows);
          if(page > this.pages){
            this._router.navigate(['/gente', 1]);
          }
        }
      },
      error =>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage !=null){
          this.status = 'error';
        }
      }
    );
  }

  public followUserOver: any;
  mouseEnter(user_id: string){
    this.followUserOver = user_id;
  }

  mouseLeave(){
    this.followUserOver = 0;
  }

  followUser(followed: string){
    var follow = new Follow('', this.identity._id, followed);

    this._followService.addFollow(this.token, follow).subscribe(
      response => {
        if(!response.follow){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.follows.push(followed);

        }
      },
      error =>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage !=null){
          this.status = 'error';
        }
      }
    );
  }

  unFollowUser(followed: any){
    this._followService.deleteFollow(this.token, followed).subscribe(
      response => {
        var search = this.follows.indexOf(followed);
        if(search != -1){
          this.follows.splice(search, 1);
        }
      },
      error =>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage !=null){
          this.status = 'error';
        }
      }
    );
  }

}
