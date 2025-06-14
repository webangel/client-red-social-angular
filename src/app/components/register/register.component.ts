import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {User} from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  providers: [UserService],
  styleUrls: ['./register.css'],
})

export class RegisterComponent implements OnInit{
  public title:string;
  public user: User;

  public message: string;
  public status: string;

  data: any[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ){
    this.title = 'registrate';
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
    console.log('Componente register cargando...');
  }
  onSubmit(form: any){
    this._userService.register(this.user).subscribe(

      data => {
        this.data = data;
        //console.log(this.data);
        if(data.message) {
          //alert(data.message);
          this.message = data.message;
          this.status = "warning";
        }
        if(data.user){
          this.message = "Usuario gesistrado correctamente...";
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

}

