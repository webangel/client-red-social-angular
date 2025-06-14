import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { GLOBAL } from './global';

@Injectable()
export class UserService{
	public identity: any;
	public token: any;
	public url: string;
  public stats: any;

  constructor(private _http: HttpClient){
		this.url = GLOBAL.url;
    this.identity = '';
    this.token = '';
	}

  register(user: User): Observable<any>{

     let params = JSON.stringify(user)
     let headers = new HttpHeaders({'Content-Type': 'application/json'});

     return this._http.post(this.url+'register', params, {headers: headers});

  }

  signup(user: any, gettoken = ""): Observable<any>{

    if(gettoken != null){
      user.gettoken = gettoken;
    }
    let params = JSON.stringify(user)
    let headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this._http.post(this.url+'login', params, {headers: headers});

  }

  getIdentity(){
    let storedDataString = localStorage.getItem('identity');

    if (storedDataString !== null && storedDataString !== undefined) {
      return this.identity = JSON.parse(storedDataString);
      console.log(this.identity);
    } else {
      return this.identity = null;
    }

  }

  getToken(){
    let token = localStorage.getItem('token');
    if(token !== null && token != undefined){
      this.token = token;
    }else{
      this.token = null;
    }

    return this.token;
  }

  getStats(){
    let stats = localStorage.getItem('stats');

    if(stats != undefined){
      this.stats = JSON.parse(stats);
    }else{
      this.stats = null;
    }
    return this.stats;
  }

  getCounters(userId = null): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.getToken());
      console.log("token desde getCounets", this.getToken());
      console.log("id user", userId);
     if(userId !=null){
      return this._http.get(this.url+'counters/'+userId, {headers: headers});
     }else{
      return this._http.get(this.url+'counters', {headers: headers});
     }
  }

  updateUser(user: User): Observable<any>{
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.getToken());

    return this._http.put(this.url+'update-user/'+user._id, params, {headers: headers})
  }

  getUsers(page = null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', this.getToken());
    return this._http.get(this.url+'users/'+page, {headers: headers});
  }

  getUser(id: any):Observable<any>{
    console.log(id);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', this.getToken());
    return this._http.get(this.url+'user/'+id, {headers: headers});
  }

}
