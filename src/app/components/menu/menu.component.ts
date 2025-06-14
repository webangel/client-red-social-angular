import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from '../../services/global';
import { SharedService } from "../../services/shared.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.css'],
  providers: [UserService]
})

export class MenuComponent  implements OnInit{
public title: string;
  public identity: any;
  public url: string;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _sharedService: SharedService
  ){
    this.title = 'client';
    this.url = GLOBAL.url;
  }
  ngOnInit(){
    this.identity = this._userService.getIdentity();
    console.log(this.identity);
  }
    // ngDoCheck(){
    // setTimeout(() => {
    //   this.identity = this._userService.getIdentity();
    // }, 3000);
  // }
    logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/login']);
  }

    enviarDato() {
      this._sharedService.sendMessage({ id: this.identity._id });
    }
}
