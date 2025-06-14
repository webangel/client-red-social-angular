import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { UploadService } from 'src/app/services/upload.service';
import { Publication } from '../../models/publication';
import { GLOBAL } from '../../services/global';
import { PublicationService } from '../../services/publication.service';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  providers: [UserService, PublicationService, UploadService],
  styleUrls: ['./sidebar.css'],
})

export class SidebarComponent implements OnInit {

  public title: string;
  public identity: any;
  public token: any;
  public stats: any;
  public status: string;
  public url: string;
  public publication: Publication;
  public message: string;
  public data: any[] = [];
  public filesToUpload: Array<File> = [];



  constructor(
    private _userService: UserService,
    private _publicationService: PublicationService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _sharedService: SharedService,
    private _uploadService: UploadService
  ){
    this.title = 'sidebar';

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url;
    const userId = this.identity?._id ?? '';
    this.publication = new Publication("", "", "", "", userId);
    this.message = "";
    this.status = "";
  }



  ngOnInit() {
   console.log('sidebar');
  }

  enviarDato() {
    this._sharedService.sendMessage({ id: this.identity._id });
  }

  onSubmit(form: any, $event: Event){
    this._publicationService.addPublication(this.token, this.publication).subscribe(

      data => {
        this.data = data;
        console.log(this.data);
        if(data.message) {
          //alert(data.message);
          this.message = data.message;
          this.status = "warning";
        }
        if(data.publication){

          if(this.filesToUpload && this.filesToUpload.length){
            this._uploadService.makeFileRequest(
              this.url+'upload-image-pub/'+data.publication._id,
              [],
              this.filesToUpload,
              this.token,
              "file"
            ).then((result:any)=>{
              this.publication.file = result.image;
              this.message = "Publicación registrado correctamente...";
              this.status = "success";
              form.reset();
              this._router.navigate(['/home']);
              this.sended.emit({emit: 'true'});
            });
          }else{
             this.message = "Publicación registrado correctamente...";
              this.status = "success";
              form.reset();
              this._router.navigate(['/home']);
          }

        }else{
          this.status = "danger";
        }
      },
      error => {
        console.error("Error:", error);
        this.message = "Se produjo un error al publicar.";
        this.status = "danger";
      }
    );
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

    //Output
  @Output() sended = new EventEmitter();
  sendPublication(event: any){
    this.sended.emit({emit: 'true'});

  }

}



