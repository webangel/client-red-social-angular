import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
import { GLOBAL } from './global';

@Injectable()
export class MessageService{
  public url: string;
  constructor(
    private _http: HttpClient
  ){
    this.url = GLOBAL.url;
  }

  addMessage(token:any, message:Message):Observable<any>{
    let params = JSON.stringify(message);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);
    return this._http.post(this.url+'message', params, {headers});
  }

  getMyMessages(token: any, page=1):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);

    return this._http.get(this.url+'my-messages/'+page, { headers });

  }

  getEmmitMyMessages(token: any, page=1):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);

    return this._http.get(this.url+'messages/'+page, { headers });

  }


}
