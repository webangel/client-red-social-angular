import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GLOBAL } from 'src/app/services/global';
import { UploadService } from 'src/app/services/upload.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  providers: [UserService, UploadService],
  styleUrls: ['./user-edit.css'],
})

export class UserEditComponent implements OnInit{

  public title: string;
  public user: User;
  public identity: any;
  public token: any;
  public message: string;
  public status: string;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _uploadService: UploadService,
  ){
    this.title = 'Actualizar mis datos';
    this.user = this._userService.getIdentity();
    this.identity = this.user;
    this.token = this._userService.getToken();
    this.message= '';
    this.status = '';
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    console.log("user-edit.component se ha cargado!!");
  }

  onSubmit(form: any) {
    console.log("datos", this.user);
    this._userService.updateUser(this.user).subscribe(
      response => {
        if(!response.user){
          this.status = "danger";
        }else{
          this.status = "success";
          this.message = "Usuario actualizado correctamente...";
          localStorage.setItem('identity', JSON.stringify(this.user));
          this.identity = this.user;

          //subida de imagenes
          this._uploadService.makeFileRequest(
            this.url+'upload-image-user/'+this.user._id,
            [],
            this.filesToUpload,
            this.token,
            'image').then((result: any)=>{
              console.log(result);
              this.user.image = result.user.image;
              localStorage.setItem('identity', JSON.stringify(this.user));
            });
        }
      },
      error=>{
        var erroeMessage = <any>error;
        console.log(erroeMessage);

        if(erroeMessage != null){
          this.status = "danger";
          this.message = "Se produjo un error al procesar la solicitud.";
        }
      }
    );
  }

  public filesToUpload!: Array<File>;

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log( this.filesToUpload);
  }



}
