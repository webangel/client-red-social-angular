
import { Component } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  providers: [],
  styleUrls: ['./home.css'],
})
export class HomeComponent {

  public title: string;

  public total: any;
  public pages: any;

  valorDesdeA: any;

  constructor() {
    this.title = "Bienvenido a Scalar Social";

  }
  ngOnInit() {
    console.log('Home.component cargando...');

  }

  receiveValue(event: any){
    this.valorDesdeA = event;
  }

}

