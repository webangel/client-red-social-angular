import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Follow } from 'src/app/models/follow';
import { User } from '../../models/user';
import { FollowService } from '../../services/follow.service';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  providers: [UserService, FollowService],
  styleUrls: ['./profile.css'],
})

export class ProfileComponent implements OnInit{
  public title: string;
  public user: User;
  public status: any;
  public identity: any;
  public token: any;
  public stats: any;
  public url: string;
  public followed: any;
  public following: any;
  public state: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _followService: FollowService,
    private _sharedService: SharedService
  ){
    this.title = 'Perfil';
    this.user = this._userService.getIdentity();
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.followed = false;
    this.following = false;
    const navigation = this._router.getCurrentNavigation();
    this.state = navigation?.extras.state as { hiddenData: any };


  }

   ngOnInit(): void {
    console.log("Profile.component cargado correctamente...");

    //  if (this.state?.hiddenData) {
    //   console.log('Dato oculto recibido:', this.state.hiddenData);
    //   this.loadPage();
    //   // Pásalo al componente publication si es necesario
    // }
    this.loadPage();
  }

  enviarDato(id: any) {
    this._sharedService.sendMessage({ id: id });
  }


  loadPage(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.enviarDato(id);
      this.getUser(id);
      this.getCounters(id);
    });
  }

  getUser(id: any){
    console.log("ID", id);
    this._userService.getUser(id).subscribe(
      response =>{

        if(response.user){
          console.log("response", response);
          this.user = response.user;
          if( response.following && response.following._id){
            this.following = true;
          }else{
            this.following = false;
          }
          if( response.followed && response.followed._id){
            this.followed= true;
          }else{
            this.followed = false;
          }
        }else {
          this.status = "error";
        }

      },
      error => {
        console.log(<any>error);
        this._router.navigate(['/perfil', this.identity._id]);
      }
    );
  }

  getCounters(id: any){
    this._userService.getCounters(id).subscribe(
      Response =>{
          console.log(Response);
          this.stats = Response;
      },
      error =>{
        console.log(<any>error);
      }
    );

  }

  followUser(followed: any){
    var follow = new Follow('', this.identity._id, followed);

    this._followService.addFollow(this.token, follow).subscribe(
      Response =>{

          this.following = true;
      },
      error =>{
        console.log(<any>error);
      }
    );

  }

  unFollowUser(followed: any){

    this._followService.deleteFollow(this.token, followed).subscribe(
      Response =>{

          this.following = false;
      },
      error =>{
        console.log(<any>error);
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


}
