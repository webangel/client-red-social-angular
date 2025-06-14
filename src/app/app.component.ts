import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from './services/global';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  public title: string;
  public identity: any;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
  ){
    this.title = 'client';
    this.url = GLOBAL.url;
  }
  ngOnInit(){
    this.identity = this._userService.getIdentity();
    console.log(this.identity);
  }

  ngDoCheck(){
    setTimeout(() => {
      this.identity = this._userService.getIdentity();
    }, 3000);

  }


  // logout(){
  //   localStorage.clear();
  //   this.identity = null;
  //   this._router.navigate(['/login']);
  // }

}
