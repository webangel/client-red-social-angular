import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {User} from '../../models/user';
import { UserService } from '../../services/user.service';
import { Message } from '../../models/message';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [UserService],
  styleUrls: ['./login.css'],
})

export class LoginComponent implements OnInit{
  public title:string;
  public user: User;

  public message: string;
  public status: string;
  public identity:any;
  public token:any;

  data: any[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ){
    this.title = 'Indentificate';
    this.message = "";
    this.status = "";
    this.user = new User(
      "",
      "",
      "",
      "",
      "",
      "",
    "ROLE_USER",
      "",
    );
  }
  ngOnInit(){
    console.log('Componente login cargando...');
  }

  onSubmit(form: any){
    this._userService.signup(this.user).subscribe(

      data => {
        this.identity = data.user;

        if(!this.identity || !this.identity._id){
          this.status = "danger";
          this.message = "Se produjo un error al procesar la solicitud.";
        }else{
          this.message = `${data.user.name}`;
          localStorage.setItem('identity', JSON.stringify(this.identity));
          this.getToken();
        }

        if(data.message) {
          console.log(data.message);
          //alert(data.message);
          this.message = data.message;
          this.status = "warning";
        }
        if(data.user){
          this.message = `${data.user.name}`;
          this.status = "success";
          form.reset();
          console.log(data.user);
        }
      },
      error => {
        console.error("Error:", error);
        this.message = "Se produjo un error al procesar la solicitud.";
        this.status = "danger";
      }
    );
  }

  getToken(){
    this._userService.signup(this.user, 'true').subscribe(

      data => {
        this.token = data.token;

        if(this.token <=0){
          this.status = "danger";

        }else{
          localStorage.setItem('token', this.token);
          this.getCounters();
        }
      },
      error => {
        console.error("Error:", error);
        this.message = "Se produjo un error al procesar la solicitud.";
        this.status = "danger";
      }
    );
  }

  getCounters(){
    this._userService.getCounters().subscribe(
      data =>{

        console.log(data);

          localStorage.setItem('stats', JSON.stringify(data));
          this.status = "success";
          setTimeout(() => {
            this._router.navigate(['/']);
          }, 3000);

      },
      error =>{
        console.log(<any>error);
      }
    )
  }
}
